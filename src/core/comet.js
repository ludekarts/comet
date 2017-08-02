import {tempSource} from "../templates/source";

// Vendors.
import fs from 'fs';
import {remote} from "electron";
import ps from "perfect-scrollbar";

// Components.
import Wrapper from "./wrapper";
import AttrsEditor from "./attrs";
import Navigator from "./navigator";
import EquationsPanel from "./equations";

// Templates.
import {commands} from "../templates/latex";

// Tools.
import wrapp from "../tools/wrapp";
import toHTML from "../parser/tohtml";
import {endCaret} from "../tools/caret";
import Keytracker from "../tools/keytracker";
import {toXML, cleanMath} from "../parser/toxml";
import {addComand, wrapCommand, switchCommands} from "../tools/cmds";
import {loopstack, pause, debounce, debouncePromise, clipboard, formatXml} from "../tools/utils";
import {wrapMath, singleMathRender, updateMath, renderMath, singleMathPromise} from "../tools/math";

// UI references.
const introClose = document.getElementById('introClose');
const workspace = document.getElementById('workspace');
const outClose = document.getElementById('outClose');
const controls = document.getElementById('controls');
const preview = document.getElementById('preview');
const output = document.getElementById('output');
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
const renderMathPrview = debounce(() => updateMath(input.textContent, preview), 500);

// Append editor.
workspace.appendChild(Wrapper.element);
workspace.appendChild(AttrsEditor.element);
workspace.appendChild(EquationsPanel.element);
workspace.appendChild(EquationsPanel.element);

// Add scrollbar.
ps.initialize(editor);
ps.initialize(intro.querySelector('.intro-content'));


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
    wrapCommand('\\mathrm', buffer).then((node) => {
      recordLatexState();
      endCaret(node);
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
  EquationsPanel.add(input.textContent, navigator.update(input.textContent))
  recordXmlState();
};

// Re-render math after adding new instance to the editor.
Wrapper.onAddMath(navigator.select.bind(null,'span.jax-math'));
EquationsPanel.onAddMath(navigator.select.bind(null,'span.jax-math'));

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
  output.firstElementChild.value = formatXml(toXML(cleanMath(editor.firstElementChild.cloneNode(true))));
  output.classList.add('show');
};

const hidePanels = () => {
  Wrapper.hide();
  AttrsEditor.hide();
  EquationsPanel.hide();
};

function reRenderMath() {
  renderMath(editor).then(() => {
    wrapMath(editor);
    navigator.select('span.jax-math');
  });
}

const parse = (xml) => {
  editor.innerHTML = '';
  // Append new XML.
  editor.appendChild(toHTML(xml));
  // Setup math renndering.
  reRenderMath();
  // Hide help panel.
  toggleIntro(false);
  // Inintil Histroy state.
  recordXmlState();
};

const closeOutput = () => {
  output.classList.remove('show');
};

// Load XML file.
const openXmlFile = () => {
  dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{
      name: 'Xml',
      extensions: ['xml', 'cnxml']
    }]
  }, (url) => {
    if (!url) return;
    url = url[0];
      fs.readFile(url, 'utf8', (err, data) => {
        if (err) throw err;
        parse(data);
    });
  });
};

const toggleIntro = (flag) => {
  if (flag === undefined) intro.classList.toggle('show');
  else if (flag === true) intro.classList.add('show');
  else if (flag === false) intro.classList.remove('show');
}

// Handle controll buttons.
const controler = ({target}) => {
  const action = target.dataset.action;
  if (action === 'out') exportToXML();
  if (action === 'help') toggleIntro(true);
  if (action === 'eq') EquationsPanel.toggle();
};


// ---- Setup keyboard events ------------

keytracker
  .onkey('F2', updateLatex)
  .onkey('Escape', hidePanels)
  .onkey('x', 'alt', exportToXML)
  .onkey('o', 'ctrl', openXmlFile)
  .onkey('w', 'alt', Wrapper.show)
  .onkey('z', 'ctrl', restoreHistory)
  .onkey('[', wrapSelectedText('[*]'))
  .onkey('Tab', '!prevent', tabThrough)
  .onkey(' ', 'ctrl', EquationsPanel.toggle)
  .onkey('|', 'shift', wrapSelectedText('|*|'))
  .onkey('{', 'shift', wrapSelectedText('{*}'))
  .onkey('(', 'shift', wrapSelectedText('(*)'))
  .onkey('q', 'alt', wrapp.remove.bind(null, '#editor'))
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
  renderMathPrview();
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
  // Activate math element.
  if (isMath) navigator.set(target);
  // Copy element ID.
  if (ctrlKey && !isMath && target.id) clip(target.id);
  // Open Attribute editor.
  if (altKey && !isMath) (AttrsEditor.select(target), EquationsPanel.hide());
  // Copy MML to the clipboard
  if (ctrlKey && isMath) clip(target.querySelector('span[data-mathml]').dataset.mathml);
};


// ---- Event listeners ----------------

controls.addEventListener('click', controler);
outClose.addEventListener('click', closeOutput);
editor.addEventListener('click', detectElement);
input.addEventListener('keyup', keypressHandler);
document.addEventListener('keydown', interceptKeys);
introClose.addEventListener('click', toggleIntro.bind(null, false));
