import {tempSource} from "core/source";

// Style.
import mainStyles from "styles/main.css";
import cnxmlStyles from "styles/cnxml.css";
import eqStyles from "styles/equations.css";
import workspaceStyles from "styles/workspace.css";

// Components.
import {commands} from "core/latex";
import Navigator from "core/navigator";
import {addComand, wrapCommand, switchCommands} from "core/cmds";

// Tools.
import ps from "perfect-scrollbar";
import toHTML from "tools/tohtml";
import Keytracker from "tools/keytracker";
import {loopstack, wrapMath, pause, fuzzysearch, debouncePromise} from "tools/utils";


// UI references.
const preview = document.getElementById('preview');
const editor = document.getElementById('editor');
const input = document.getElementById('input');

// Input history.
const recordState = () => {
  state.history.push(input.textContent);
};

const restroeState = () => {
  input.textContent = state.history.pull();
};

// Global state.
const state = {
  buffer: '',
  getCommand: undefined,
  history: loopstack(30),
  cmdReference: undefined
};


// Global methods.
const navigator = Navigator();
const keytracker =  Keytracker();
const renderXMLMath = wrapMath(editor);
const saveHistory = pause(recordState, 1500);
const checkBuffer = debouncePromise(filterCmds(commands), 500);

let equation;

// Setup math renndering.
MathJax.Hub.queue.Push(() => equation = MathJax.Hub.getAllJax("preview")[0]);
MathJax.Hub.queue.Push(renderXMLMath);
MathJax.Hub.queue.Push(navigator.select.bind(null, 'span.flux-math'));

// Render input content as MathJax math.
const renderMath = (event) =>
  MathJax.Hub.queue.Push(["Text", equation, "\\displaystyle{" + input.textContent + "}"]);

// Wrap selection with wrappers.
const wrapSelection = (template) => () => {
  const wraps = template.split('*');
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const selectedText = range.toString();
  document.execCommand("insertHTML", false, wraps[0] + selectedText + wraps[1]);
  if (selectedText.length === 0) selection.modify('move', 'backward', 'character');
  recordState();
};

// Tab key handler.
const tabThrough = (target) => {
  state.cmdReference && target.matches('#input')
    // Tab commands in input.
    ? (state.cmdReference.textContent = `\\${state.getCommand()}` , recordState())
    // Tab through equations in XML.
    : navigator.next().scrollIntoView();
};

const wrapWithCommand = (buffer) => () =>
  wrapCommand('mathrm', buffer).then(recordState);

// Filter commands base on buffer string.
function filterCmds (commands) {
  return (buffer) => {
    buffer = buffer.trim();
    if (buffer.length <= 1) return [];
    const index = commands.indexOf(buffer);
    const filteredCmds = ~index
      ? [commands[index]]
      : commands.filter(cmd => fuzzysearch(buffer, cmd));
    return filteredCmds;
  };
};

const updateLatex = () => {
  navigator.update(input.textContent);
}

// Setup keyboard events.
keytracker
  .onkey(9, tabThrough)
  .onkey('F2', updateLatex)
  .onkey('z', 'ctrl', restroeState)
  .onkey('Enter', 'ctrl', renderMath)
  .onkey('[', wrapSelection('[*]'))
  .onkey('|', 'shift', wrapSelection('|*|'))
  .onkey('{', 'shift', wrapSelection('{*}'))
  .onkey('(', 'shift', wrapSelection('(*)'))
  .onkey('i', 'ctrl', wrapWithCommand(state.buffer))
  .onkey(38, 'alt', wrapSelection('\\left*\\right'));


// ---- Event handlers ----------------

const interceptKeys = (event) => {
  const {target, keyCode, shiftKey, ctrlKey} = event;
  if (!ctrlKey && !shiftKey && keyCode !== 27 && keyCode !== 13 && target.matches('#input')) saveHistory();
  keytracker.test(event);
};

const keypressHandler = ({key, keyCode}) => {
  if (keyCode !== 9)
    checkBuffer(state.buffer += key)
      .then((cmds) => {
        if (cmds.length > 0) {
          // Set global references.
          state.getCommand = switchCommands(cmds);
          state.cmdReference = addComand(cmds.slice(-1)[0], state.buffer);
        }
        state.buffer = '';
      });
};


// ---- Initialization ----------------

editor.appendChild(toHTML(tempSource));
ps.initialize(editor);

// Set event handlers.
input.addEventListener('keyup', keypressHandler);
document.addEventListener('keydown', interceptKeys);
