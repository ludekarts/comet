import {getNodesOut} from "../tools/utils";
import {createElement, template} from "../tools/travrs";

const scaffold = `
  div.searchbox
    h3 > "Search words"
    div.input
      @input::input[type="text"]
      @counter::span.counter > "0"
    div.footer
      span > "Use <b>TAB</b> to navigate through results"
      button.flat.save[data-action="search"] > "Search"
`;

export default (root, source) => {

  let onFoundCallback, results = [];
  const [element, refs] = template(scaffold);

  const scanNodes = (node, func) => {
    func(node);
    node = node.firstChild;
    while (node) {
      scanNodes(node, func);
      node = node.nextSibling;
    }
  }

const findPhrase = (phrase) => {
  const results = [];
  scanNodes(source, (node) => {
    if (node.nodeType === 3) {
      const index = node.data.indexOf(phrase);
      ~index && results.push([node, index, index + phrase.length]);
    }
  });

  refs.counter.textContent = results.length;

  results.forEach(params => {
    const range = document.createRange();
    const [node, start, end] = params;
    range.setStart(node, start);
    range.setEnd(node, end);
    range.surroundContents(createElement('span.found'));
  });

  if (results.length > 0 && onFoundCallback) onFoundCallback();
};

  const detectAction = ({target}) => {
    const action = target.dataset.action;
    if (!action) return;
    if (action === 'search' && refs.input.value.length > 0) findPhrase(refs.input.value);
  };

  const detectEnter = ({keyCode}) =>
    keyCode === 13 && refs.input.value.length > 0 && findPhrase(refs.input.value);

  // Listeners.
  refs.input.addEventListener('keyup', detectEnter);
  element.addEventListener('click', detectAction);
  root.appendChild(element);

  const toggle = () => {
    if (element.classList.toggle('show')) {
      refs.input.focus();
    }
    else {
      Array.from(source.querySelectorAll('span.found')).forEach(getNodesOut);
      refs.counter.textContent = 0;
      refs.input.value = '';
    }
  }

  const whenFound = (callback) => onFoundCallback = callback;

  return {toggle, whenFound}
};
