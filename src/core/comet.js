import {tempSource} from "temps/source";

// Style.
import mainStyles from "styles/main.css";
import cnxmlStyles from "styles/cnxml.css";
import eqStyles from "styles/equations.css";
import workspaceStyles from "styles/workspace.css";

// Components.
import ps from "perfect-scrollbar";
import {commands} from "temps/latex";
import attrsEditor from "core/attrs";
import Navigator from "core/navigator";

// Tools.
import toHTML from "tools/tohtml";
import Keytracker from "tools/keytracker";
import {toXML, cleanMath} from "tools/toxml";
import {addComand, wrapCommand, switchCommands} from "tools/cmds";
import {loopstack, wrapMath, pause, debouncePromise, endCaret, clipboard} from "tools/utils";

// UI references.
const workspace = document.getElementById('workspace');
const preview = document.getElementById('preview');
const editor = document.getElementById('editor');
const input = document.getElementById('input');

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
const checkBuffer = debouncePromise(filterCmds(commands), 500);

// Append editor.
workspace.appendChild(attrsEditor.element);

// Setup math renndering.
MathJax.Hub.queue.Push(() => state.equation = MathJax.Hub.getAllJax("preview")[0]);
MathJax.Hub.queue.Push(renderXMLMath);
MathJax.Hub.queue.Push(navigator.select.bind(null, 'span.flux-math'));

// Render input content as MathJax math.
const renderMath = (event) =>
  MathJax.Hub.queue.Push(["Text", state.equation, "\\displaystyle{" + input.textContent + "}"]);

const reRenderMath = (callback) =>
  MathJax.Hub.Queue(["Typeset", MathJax.Hub, renderXMLMath, callback]);

// Wrap selection with wrappers.
const wrapSelectedText = (template) => () => {
  const wraps = template.split('*');
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const selectedText = range.toString();
  document.execCommand("insertHTML", false, wraps[0] + selectedText + wraps[1]);
  if (selectedText.length === 0) selection.modify('move', 'backward', 'character');
  recordLatexState();
};

// Tab key handler.
const tabThrough = (event) => {
  // Tab commands in input.
  if (state.cmdReference && event.target.matches('#input')) {
    event.preventDefault();
    state.cmdReference.textContent = state.getCommand();
    recordLatexState();
  }
  // Tab through equations in XML.
  else if (event.target.matches('#editor')) {
    event.preventDefault();
    navigator.next().scrollIntoView();
    editor.scrollTop = editor.scrollTop - 60;
  }
};

const wrapWithCommand = (buffer) => (event) => {
  if (event.target.matches('#input')) {
    event.preventDefault();
    wrapCommand('mathrm', buffer).then(recordLatexState);
  }
};

// Filter commands base on buffer string.
function filterCmds (commands) {
  return (buffer) => {
    buffer = buffer.trim();
    return (buffer.length > 1) ? commands.filter(cmd => ~cmd.indexOf(buffer)) : []
  };
};

// Change current selected equation according to latex input.
const updateLatex = () => {
  navigator.update(input.textContent);
  recordXmlState();
};

// Undo handler.
const restoreHistory = ({target}) => {
  if (target.matches('#input')) {
    restoreLatexState();
  }
  else if (target.matches('#editor')) {
    restoreXmlState();
    navigator.select('span.flux-math');
  }
};

const exportToXML = () => {
  console.log(toXML(cleanMath(editor.firstElementChild.cloneNode(true))));
}

// Setup keyboard events.
keytracker
  .onkey('F2', updateLatex)
  .onkey(27, attrsEditor.hide)
  .onkey('x', 'alt', exportToXML)
  .onkey(9, '!prevent', tabThrough)
  .onkey('z', 'ctrl', restoreHistory)
  .onkey('Enter', 'ctrl', renderMath)
  .onkey('[', wrapSelectedText('[*]'))
  .onkey('|', 'shift', wrapSelectedText('|*|'))
  .onkey('{', 'shift', wrapSelectedText('{*}'))
  .onkey('(', 'shift', wrapSelectedText('(*)'))
  .onkey(38, 'alt', wrapSelectedText('\\left*\\right'))
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
  if (keyCode !== 9)
    checkBuffer(state.buffer += key)
      .then((cmds) => {
        if (cmds.length > 0) {
          // Set global references.
          state.getCommand = switchCommands(cmds);
          state.cmdReference = addComand(state.buffer, state.buffer);
        }
        state.buffer = '';
      });
};

// Detect element clicked with Alt key.
const detectElement = ({target, altKey, ctrlKey}) => {
  const isMath = target.matches('span.flux-math');
  if (altKey && isMath) navigator.set(target)
  if (altKey && !isMath) attrsEditor.select(target);
  if (ctrlKey && isMath) clip(target.querySelector('script').innerHTML);
  if (ctrlKey && !isMath && target.id) clip(target.id);
};


// ---- Initialization ----------------

editor.appendChild(toHTML(tempSource));
ps.initialize(editor);

// Set event handlers.
editor.addEventListener('click', detectElement);
input.addEventListener('keyup', keypressHandler);
document.addEventListener('keydown', interceptKeys);

// TODO:
// - lista stworzonych równań
// - zapis XML
// - obsługa tabel
// - obsluga linków
// - woijanie elementów
