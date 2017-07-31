import {tempSource} from "../templates/source";

// Vendors.
import fs from 'fs';
import {remote} from "electron";
import ps from "perfect-scrollbar";

// Components.
import attrsEditor from "./attrs";
import Navigator from "./navigator";
import equationsPanel from "./equations";

// Templates.
import {commands} from "../templates/latex";

// Tools.
import wrapp from "../tools/wrapp";
import toHTML from "../tools/tohtml";
import {endCaret} from "../tools/caret";
import Keytracker from "../tools/keytracker";
import {toXML, cleanMath} from "../tools/toxml";
import {addComand, wrapCommand, switchCommands} from "../tools/cmds";
import {loopstack, pause, debouncePromise, clipboard} from "../tools/utils";
import {wrapMath, singleMathRender, updateMath, renderMath, singleMathPromise} from "../tools/math";

// UI references.
const workspace = document.getElementById('workspace');
const preview = document.getElementById('preview');
const editor = document.getElementById('editor');
const input = document.getElementById('input');
const intro = document.getElementById('intro');

const dialog = remote.dialog;

// Input history.
const recordLatexState = () => {
  state.latexHistory.push(input.textContent);
};

const restoreLatexState = () => {
  input.textContent = state.latexHistory.pull();
  endCaret(input);
};

const recordXmlState = () => {
  state.xmlHistory.push(cleanMath(editor.cloneNode(true)).innerHTML);
};

const restoreXmlState = () => {
  editor.innerHTML = state.xmlHistory.pull();
  reRenderMath();
};

// Global state.
const state = {
  buffer: '',
  equation: undefined,
  getCommand: undefined,
  cmdReference: undefined,
  xmlHistory: loopstack(10),
  latexHistory: loopstack(30)
};

// Global methods.
const navigator = Navigator();
const keytracker =  Keytracker();
const clip = clipboard(workspace);
const renderXMLMath = wrapMath(editor);
const saveXmlHistory = pause(recordXmlState, 1000);
const saveLatexHistory = pause(recordLatexState, 1500);
const checkBuffer = debouncePromise(filterCmds(commands), 300);

// Append editor.
workspace.appendChild(attrsEditor.element);
workspace.appendChild(equationsPanel.element);

// Add scrollbar.
ps.initialize(editor);

// Unlock edit viev
function removeBlockage() {
  intro.classList.remove('show');
}

// Remder LaTeX equation.
const renderMathPrview = () => updateMath(input.textContent, preview);

// Wrap selection with wrappers.
const wrapSelectedText = (template) => () => {
  wrapp.withText(template);
  recordLatexState();
};

// Tab key handler.
const tabThrough = (event) => {
  // Tab commands in input.
  if (event.target.matches('#input')) {
    event.preventDefault();
    if (state.cmdReference) {
      state.cmdReference.textContent = state.getCommand();
      endCaret(state.cmdReference);
      recordLatexState();
    }
  }
  // Tab through equations in XML.
  else if (event.target.matches('#editor')) {
    event.preventDefault();
    navigator.next().scrollIntoView();
    editor.scrollTop = editor.scrollTop - 60;
  }
};

// Wrap buffer with \mathrm command.
const wrapWithCommand = (buffer) => (event) => {
  if (event.target.matches('#input')) {
    event.preventDefault();
    wrapCommand('\\mathrm', buffer).then( () => {
      endCaret(state.cmdReference);
      recordLatexState();
    });
  }
};

// Filter commands base on buffer string.
function filterCmds (commands) {
  return (buffer) => {
    buffer = buffer.trim();
    return (buffer.length > 1)
      ? commands
        .filter(cmd => ~cmd.indexOf(buffer))
        .sort((a, b) => {
          const index = b.indexOf(buffer) - a.indexOf(buffer);
          return !!index ? index : b.length - a.length;
        })
      : [];
  };
};


// Change current selected equation according to latex input.
const updateLatex = () => {
  equationsPanel.add(input.textContent, navigator.update(input.textContent))
  recordXmlState();
};

// Re-render math after adding new instance to the editor.
equationsPanel.onAddMath(navigator.select.bind(null,'span.jax-math'));

// Undo handler.
const restoreHistory = ({target}) => {
  if (target.matches('#input')) {
    restoreLatexState();
  }
  else if (target.matches('#editor')) {
    restoreXmlState();
    navigator.select('span.jax-math');
  }
};


const exportToXML = () => {
  console.log(toXML(cleanMath(editor.firstElementChild.cloneNode(true))));
};

const hidePanels = () => {
  attrsEditor.hide();
  equationsPanel.hide();
};

const parse = (xml) => {
  editor.innerHTML = '';
  // Append new XML.
  editor.appendChild(toHTML(xml));
  // Setup math renndering.
  renderMath(editor).then(() => {
    wrapMath(editor);
    navigator.select('span.jax-math');
  });
};


// Load XML file.
const openXmlFile = () => {
  dialog.showOpenDialog({ properties: ['openFile']}, (url) => {
    if (!url) return;
    url = url[0];
      fs.readFile(url, 'utf8', (err, data) => {
        if (err) throw err;
        parse(data);
    });
  });
};

// ---- Setup keyboard events ------------

keytracker
  .onkey('F2', updateLatex)
  .onkey('Escape', hidePanels)
  .onkey('x', 'alt', exportToXML)
  .onkey('o', 'ctrl', openXmlFile)
  .onkey('z', 'ctrl', restoreHistory)
  .onkey('[', wrapSelectedText('[*]'))
  .onkey('Tab', '!prevent', tabThrough)
  .onkey(' ', 'ctrl', equationsPanel.toggle)
  .onkey('Enter', 'ctrl', renderMathPrview)
  .onkey('|', 'shift', wrapSelectedText('|*|'))
  .onkey('{', 'shift', wrapSelectedText('{*}'))
  .onkey('(', 'shift', wrapSelectedText('(*)'))
  .onkey('ArrowUp', 'alt', wrapSelectedText('\\left*\\right'))
  .onkey('i', 'ctrl', '!prevent', wrapWithCommand(state.buffer));


// ---- Event handlers ----------------

const interceptKeys = (event) => {
  const {target, keyCode, shiftKey, ctrlKey} = event;
  // Save history.
  if (!ctrlKey && !shiftKey && keyCode !== 27 && keyCode !== 13 ) {
    if (target.matches('#input')) saveLatexHistory();
    else if (target.matches('#editor')) saveXmlHistory();
  }
  keytracker.test(event);
};

const keypressHandler = ({key, keyCode}) => {
  // All except Tab.
  if (keyCode !== 9) {
    checkBuffer(state.buffer += key)
      .then((cmds) => {
        if (cmds.length > 0) {
          // Set global references.
          state.getCommand = switchCommands(cmds);
          state.cmdReference = addComand(cmds.slice(-1)[0], state.buffer);
          endCaret(state.cmdReference);
        }
        state.buffer = '';
      });
      state.cmdReference = null;
    }
};

// Detect element clicked with Alt key.
const detectElement = ({target, altKey, ctrlKey}) => {
  const isMath = target.matches('span.jax-math');
  if (altKey && isMath) navigator.set(target)
  if (altKey && !isMath) attrsEditor.select(target);
  if (ctrlKey && isMath) clip(target.querySelector('script').innerHTML);
  if (ctrlKey && !isMath && target.id) clip(target.id);
};


// ---- Event listeners ----------------

editor.addEventListener('click', detectElement);
input.addEventListener('keyup', keypressHandler);
document.addEventListener('keydown', interceptKeys);
