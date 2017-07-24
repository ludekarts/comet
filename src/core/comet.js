
import ps from "perfect-scrollbar";
import tempSource from "core/source";
import navigator from "core/navigator";
import latextComands from "core/latex";

// Style.
import mainStyles from "styles/main.css";
import cnxmlStyles from "styles/cnxml.css";
import eqStyles from "styles/equations.css";
import workspaceStyles from "styles/workspace.css";




/*
const Comet = (function(cnxml, Navigator, Ps, latextComands, {
  createElement, loopstack, pause, debounce, wrapElement, wrapMath, fuzzysearch
}) {

  // Global state.
  const state = {
    history: loopstack(30)
  };

  const recordState = () => {
    state.history.push(input.textContent);
  };

  const restroeState = () => {
    input.textContent = state.history.pull();
  };

  const excluded = ['math', 'term', 'emphasis'];

  const nav = Navigator();

  const preview = document.getElementById('preview');
  preview.appendChild(toHtml());

  const workspace = document.getElementById('workspace');
  const xmlview = document.getElementById('xmlview');
  const input = document.getElementById('input');
  const hints = document.getElementById('hints');

  const renderMath = wrapMath(preview);

  // Get the element jax when MathJax has produced it.
  MathJax.Hub.queue.Push(() => equation = MathJax.Hub.getAllJax("output")[0]);
  MathJax.Hub.queue.Push(renderMath);
  MathJax.Hub.queue.Push(nav.select.bind(null, 'span.flux-math'));

  const showMML = () => console.log(equation.root.toMathML());
    // mml.value = equation.root.toMathML();

  const transform = (event) =>
    MathJax.Hub.queue.Push(["Text", equation, "\\displaystyle{" + input.textContent + "}", showMML]);

  const commands = latextComands;

  let buffer = '';
  let currentCommand;
  let filteredCmds = [];
  let getCommand;

  const addComand = (commad, content) => {
    const selection = window.getSelection();
    const cnode = document.createTextNode('\\' + commad + (content ? `{${content}}` : ''));
    const range = selection.getRangeAt(0);
    range.setStart(range.commonAncestorContainer, range.endOffset - buffer.length);
    range.setEnd(range.commonAncestorContainer, range.endOffset);
    range.deleteContents();
    range.insertNode(cnode);
    range.setStartAfter(cnode);
    range.setEndAfter(cnode);
    return cnode;
  };

  const checkBuffer = () => {
    currentCommand = null;
    buffer = buffer.trim();
    if (buffer.length <= 1) return;

    const index = commands.indexOf(buffer);
    filteredCmds = commands.filter(cmd => fuzzysearch(buffer, cmd));
    getCommand = tabCommands(filteredCmds);
    const commad = (index >= 0)
      ? commands[index]
      : filteredCmds.slice(-1)[0];
    if (commad) {
      currentCommand = addComand(commad);
      recordState();
    }
    buffer = '';
  }

  const check = debounce(checkBuffer, 500);

  const keyboardHadler = ({target, key, keyCode}) => {
    // Tab.
    if (keyCode !== 9) {
      buffer += key;
      check();
    }
  };


  const tabCommands = (commands) => {
    let counter = -1;
    const end = commands.length - 1;
    return (start) => {
      counter = counter === end ? 0 : counter + 1;
      if (start) counter = start;
      return commands[counter];
    }
  };

  const wrapWithCommand = (command) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    range.deleteContents();
    addComand(command, selectedText);
    recordState();
  };

  const placeBrakcets = (brackets) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    document.execCommand("insertHTML", false, brackets[0] + selectedText + brackets[1]);
    if (selectedText.length === 0) selection.modify('move', 'backward', 'character');
    recordState();
  };

  // Detect typing and debounce.
  const saveHistory = pause(recordState, 1500);

  const interceptKeys = (event) => {
    const {target, keyCode, key, shiftKey, ctrlKey} = event;

    if (!ctrlKey && !shiftKey && keyCode !== 27 && keyCode !== 9 && keyCode !== 13 ) {
      saveHistory();
    }

    // F2.
    if (keyCode === 113) {
      nav.update(input.textContent);
    }

    // Tab.
    if (event.keyCode === 9) {
      event.preventDefault();
      if (currentCommand && target.matches('#input')) {
        currentCommand.textContent = `\\${getCommand()}`;
        recordState();
      }
      else {
        nav.next().scrollIntoView();
      }
    }

    if (ctrlKey && keyCode === 13) {
      event.preventDefault();
      transform();
    }

    if (key === '{') {
      event.preventDefault();
      placeBrakcets('{}');
    }

    if (key === '[') {
      event.preventDefault();
      placeBrakcets('[]');
    }

    if (key === '(') {
      event.preventDefault();
      placeBrakcets('()');
    }

    if (ctrlKey && key === 'i') {
      event.preventDefault();
      wrapWithCommand('mathrm')
    }

    if (ctrlKey && key === 'z') {
      event.preventDefault();
      restroeState();
    }
  };

  Ps.initialize(xmlview);

  input.addEventListener('keyup', keyboardHadler);
  document.addEventListener('keydown', interceptKeys);

}(cnxml, Navigator, Ps, latextComands, utils));
*/
