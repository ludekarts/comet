import connect from "./connect";
import scrollbar from "perfect-scrollbar";
import provider from "../../data/provider";
import {letexUI, refs,newMessage} from "./ui";
import {wrapMath, latexToMML, renderMath} from "../../tools/math";
import {createBuffer, createFilter, createNavigator} from "./utils";

export default function latexEditor(root) {

  // ---- Gobals ----------------
  const command = {};
  let onMathApplyCallback, selectionEnd = 0;

  // Mount UI elements.
  root.appendChild(letexUI);

  // ---- Scrollbars ----------------

  scrollbar.initialize(refs.suggestions, {maxScrollbarLength: 50});
  scrollbar.initialize(refs.messages, {maxScrollbarLength: 30});

  // ---- HOFs ----------------

  const buffer = createBuffer();
  const singleRender = latexToMML();
  const navigate = createNavigator(refs.suggestions);

  let filter;
  provider('operators')
    .then(operators => filter = createFilter(operators, refs.suggestions))
    .catch(console.error);

  // ---- Handlers ----------------

  const saveCaretPos = () => selectionEnd = refs.input.selectionEnd;

  const filterCommands = ({key, keyCode}) => {
    // Omit arrows.
    if (keyCode !== 40 && keyCode !== 38 && keyCode !== 39 && keyCode !== 37) {
      [command.buffer, command.clear] = buffer(key);
      filter(command.buffer);
      // Reset suggestions references.
      if (command.buffer.length === 0) navigate(0);
    }
  };

  const detectArrows = (event) => {
    const {keyCode, shiftKey, ctrlKey} = event;

    // Arrow Down.
    if (keyCode === 40) {
      event.preventDefault();
      const selected = navigate(1);
      selected && selected.scrollIntoView({behavior: "smooth"});
    }

    // Arrow UP.
    else if (keyCode === 38) {
      event.preventDefault();
      const selected = navigate(-1);
      selected && selected.scrollIntoView({behavior: "smooth"});
    }

    // Enter.
    else if (keyCode === 13) {
      event.preventDefault();
      if (ctrlKey) return renderMathML();
      if (shiftKey) return applyMathML();

      const letexUI = navigate();
      letexUI && detectOperator({target: letexUI});
    }
  };

  const detectOperator = ({target}) => {
    if (!target.dataset || !target.dataset.ops) return;
    const input = refs.input;
    const end = input.selectionEnd;
    const sliceStart = end - command.buffer.length;

    input.value =
      input.value.slice(0, sliceStart)
      + target.dataset.ops
      + input.value.slice(end, input.value.length);

    input.focus();
    input.selectionEnd = sliceStart + target.dataset.ops.length;
    command.clear();
  };

  // ---- Actions ----------------

  const renderMathML = () =>
    !!refs.input.value.length
      ? !refs.usejax.checked
          ? connect(refs.input.value, refs.useblock.checked).then(renderPreview)
          : singleRender(refs.input.value).then(parseMathJax).then(renderPreview)
      : false;

  const applyMathML = () => {
    if (!refs.render.textContent.length) return;
    const math = MathJax.Hub.getAllJax(refs.render)[0];
    onMathApplyCallback && onMathApplyCallback(math.root.toMathML(), refs.input.value, refs.similar.checked);
  };

  const detectTexAction = ({target}) => {
    const action = target.dataset.action;
    if (!action) return;

    switch (action) {
      case 'render':
        return renderMathML();
      case 'apply':
        return applyMathML();
    }
  };


  // ---- Renders ----------------

  const renderPreview = (json) => {
    refs.render.innerHTML = json.result;
    refs.messages.innerHTML = '';
    json.messages.reduce((result, message) => result.appendChild(newMessage(message)), refs.messages);
    renderMath(refs.render).then(wrapMath);
  };

  const parseMathJax = (node) => {
    const math = MathJax.Hub.getAllJax(node)[0];
    return {
      result: math.root.toMathML(),
      messages: math ? [] : [{message: "Cannot render this equation. The element is empty."}]
    }
  }

  // ---- Listeners ----------------

  refs.input.addEventListener('blur', saveCaretPos);
  refs.input.addEventListener('keyup', filterCommands);
  refs.input.addEventListener('keydown', detectArrows);
  refs.controls.addEventListener('click', detectTexAction);
  refs.suggestions.addEventListener('click', detectOperator);

  // ---- API methods ----------------

  const onMathApply = (callback) => onMathApplyCallback = callback;

  const toggle = () => {
    const status = letexUI.classList.toggle('show');
    status ? refs.input.focus() : (refs.suggestions.innerHTML = '');
    return status;
  };

  const render = (latex) => !refs.usejax.checked
    ? connect(latex, refs.useblock.checked).then((json) => ({mml: json.result, latex}))
    : singleRender(latex).then(parseMathJax).then((json) => ({mml: json.result, latex}));

  const addFormula = (latex, clear) => {
    if (clear) refs.input.value = "";
    refs.input.focus();
    refs.input.setSelectionRange(selectionEnd, selectionEnd);
    document.execCommand('insertText', null, latex);
  };

  return {toggle, onMathApply, render, addFormula}
};
