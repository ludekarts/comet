import send from "./send";
import operators from "./operators";
import scrollbar from "perfect-scrollbar";
import {letexUI, refs,newMessage} from "./ui";
import {wrapMath, latexToMML} from "../../tools/math";
import {createBuffer, createFilter, createNavigator} from "./utils";

export default function latexEditor(root) {

  // ---- Gobals ----------------
  let applyCallback;
  const command = {};

  // Mount UI elements.
  root.appendChild(letexUI);

  // ---- Scrollbars ----------------

  scrollbar.initialize(refs.suggestions, {maxScrollbarLength: 50});
  scrollbar.initialize(refs.messages, {maxScrollbarLength: 10});

  // ---- HOFs ----------------

  const buffer = createBuffer();
  const singleRender = latexToMML();
  const navigate = createNavigator(refs.suggestions);
  const filter = createFilter(operators, refs.suggestions);

  // ---- Handlers ----------------

  const filterCommands = ({key, keyCode}) => {
    if (keyCode !== 40 && keyCode !== 38) {
      [command.buffer, command.clear] = buffer(key);
      filter(command.buffer);
      // Reset suggestions references.
      if (command.buffer.length === 0) navigate(0);
    }
  };

  const detectArrows = (event) => {
    const {keyCode} = event;

    if (keyCode === 40) {
      event.preventDefault();
      navigate(1);
    }
    else if (keyCode === 38) {
      event.preventDefault();
      navigate(-1);
    }
    else if (keyCode === 13) {
      event.preventDefault();
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

  const detectTexAction = ({target}) => {
    const action = target.dataset.action;
    if (!action) return;

    switch (action) {
      case 'render':
        !refs.usejax.checked
          ? send(refs.input.value, refs.useblock.checked).then(renderPreview)
          : singleRender(refs.input.value).then(parseMathJax).then(renderPreview)
        break;
      case 'apply':
        const math = MathJax.Hub.getAllJax(refs.render)[0];
        applyCallback(math.root.toMathML())
        break;
    }
  };


  // ---- Renders ----------------

  const renderPreview = (json) => {
    refs.render.innerHTML = json.result;
    refs.messages.innerHTML = '';
    json.messages.reduce((result, message) => result.appendChild(newMessage(message)), refs.messages);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, refs.render, () => wrapMath(refs.render)]);
  };

  const parseMathJax = (node) => {
    const math = MathJax.Hub.getAllJax(node)[0];
    return {
      result: math.root.toMathML(),
      messages: math ? [] : [{message: "Cannot render this equation. The element is empty."}]
    }
  }

  // ---- Listeners ----------------

  refs.input.addEventListener('keyup', filterCommands);
  refs.input.addEventListener('keydown', detectArrows);
  refs.controls.addEventListener('click', detectTexAction);
  refs.suggestions.addEventListener('click', detectOperator);

  // ---- API methods ----------------

  const toggle = () => {
    const status = letexUI.classList.toggle('show');
    status ? refs.input.focus() : (refs.suggestions.innerHTML = '')
    return status;
  };

  const applyMath = (callback) => applyCallback = callback;

  return {toggle, applyMath}
};
