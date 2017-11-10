import operators from "./operators";
import scrollbar from "perfect-scrollbar";
import {fuzzysearch} from "../tools/utils";
import {createElement, template} from "./travrs";
import {wrapMath, latexToMML} from "../tools/math";

export default function latexEditor(root) {

  // ---- UI elements ----------------

  const refs = {
    render: createElement('div.render'),
    messages: createElement('ul.messages'),
    controls: createElement('div.controls'),
    suggestions: createElement('ul.suggestions'),
    usejax: createElement('input[type="checkbox"]'),
    input: createElement('input.latex[type="text"]'),
  };

  const scaffold = `
    div
      @render
      div.input
        @input
      @controls
        span.jax
          span > "MathJax"
          label.switch
            @usejax
            span.slider
        button.flat.render[data-action="render"] > "Render"
        button.flat.apply[data-action="apply"] > "Apply"
      @messages
      @suggestions
  `;

  const newMessage = ({line, column, message}) => template(`
    li >
      span.cl[title="line:column"] > "${line}:${column}"
      span > "${message}"`
  );

  // ---- Gobals ----------------
  const command = {};
  const headers = new Headers();
  const element = template(refs, scaffold);

  // Mount elements.
  root.appendChild(element);

  // ---- Scrollbars ----------------
  scrollbar.initialize(refs.suggestions, {maxScrollbarLength: 50});
  scrollbar.initialize(refs.messages, {maxScrollbarLength: 10});

  // ---- Creators ----------------
  const createBuffer = () => {
    let buffer = '';
    return (key) => {
      if (key.length === 1) buffer = (key === ' ') ? '' : buffer + key;
      else if (key === 'Backspace') buffer = buffer.slice(0, -1);
      // console.log(buffer); // Debug.
      return [buffer, () => buffer = ''];
    }
  };

  const createFilter = (operators, output) => (text) => {
    output.innerHTML = (text.length > 1)
      ? operators.reduce(
        (result, operator) => (
          (text.indexOf('\\') === 0)
          ? ~operator.indexOf(text)
          : fuzzysearch(text, operator)
        )
          ? result += `<li data-ops="${operator}"><i class="dot"></i> <span>${operator}</span></li>`
          : result
        ,''
      )
      : ''
  };

  const selectScope = (source, collection = []) => {
    let index = -1, active;
    return (up, reset = false) => {
      if (reset) collection = [];

      if(collection.length === 0) {
        collection = Array.from(source.querySelectorAll('li'));
        index = -1;
        active = undefined;
        // console.log('new', collection);
      }

      active && active.classList.remove('active');

      if (up === -1) {
        index--;
        if (index < 0) index = collection.length -1;
      }
      else if (up === 1) {
        index++;
        if (index === collection.length) index = 0;
      }

      active = collection[index];
      active && active.classList.add('active');

      return active;
    }
  };

  // ---- HOFs ----------------

  const buffer = createBuffer();
  const singleRender = latexToMML();
  const navigate = selectScope(refs.suggestions);
  const filter = createFilter(operators, refs.suggestions);

  // ---- Handlers ----------------

  const filterCommands = ({key, keyCode}) => {
    if (keyCode !== 40 && keyCode !== 38) {
      [command.buffer, command.clear] = buffer(key);
      filter(command.buffer);
      // Reset suggestions references.
      if (command.buffer.length === 0) navigate(0, true);
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
      const element = navigate(0);
      element && detectOperator({target: element});
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
          ? send(refs.input.value).then(renderPreview)
          : singleRender(refs.input.value).then(applyMathJax)
        break;
      case 'apply':
        return console.log('apply');
    }
  };

  const fetchConfig = (body) => ({
    headers,
    mode: 'cors',
    method: 'post',
    cache: 'default',
    body: '\\usepackage{math} \\begin{document} \\begin{math} ' + body + ' \\end{math} \\end{document} '
  });

  const send = (latex, isBlock = false) => {
    headers.append("x-display", isBlock ? "block" : "inline");
    return fetch('http://tex2mml.naukosfera.com', fetchConfig(latex))
      .then(response => {
        return ~response.headers.get("content-type").indexOf('application/json')
          ? response.json()
          : {result: "<math><mo>⚔</mo></math>", messages: [{column: 0, line: 0, message: "Cannot render this equation. Try to use MathJax render."}]}
      })
      .catch(error => {
        return {result: "<math><mo>⚞o⚟</mo></math>", messages: [{column: 0, line: 0, message: "Connection error"}]}
      });
  };


  const renderPreview = (json) => {
    refs.render.innerHTML = json.result;
    refs.messages.innerHTML = '';
    json.messages.reduce((result, message) => result.appendChild(newMessage(message)), refs.messages);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, refs.render, () => wrapMath(refs.render)]);
  };

  const applyMathJax = (node) => {
    refs.render.innerHTML = '';
    refs.messages.innerHTML = '';
    refs.render.appendChild(node);
  }

  // Listeners.
  refs.input.addEventListener('keyup', filterCommands);
  refs.input.addEventListener('keydown', detectArrows);
  refs.controls.addEventListener('click', detectTexAction);
  refs.suggestions.addEventListener('click', detectOperator);

  // Api methods.
  const toggle = () => {
    const status = element.classList.toggle('show');
    status ? refs.input.focus() : (refs.suggestions.innerHTML = '')
    return status;
  };

  return {toggle}
};
