import {getNodesOut} from "../tools/utils";
import {createElement, template} from "../tools/travrs";

const scaffold = `
  div.searchbox
    div.wrapper
      span.label > "Find"
      div.input
        @input::input[type="text"]
        @counter::span.counter > "0"
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

   const clearSearch = () => {
     clearSelection();
     refs.counter.textContent = 0;
     refs.input.value = '';
   }

  const detectEnter = ({keyCode}) => {
    if (keyCode === 13 && refs.input.value.length > 0) {
      clearSelection();
      findPhrase(refs.input.value);
    }
    else if (keyCode === 27 && !source.querySelector('span.found.selected')) {
      element.classList.toggle('show');
      clearSearch();
    }
  }

  const clearSelection = () =>
    Array.from(source.querySelectorAll('span.found'))
      .forEach(node => {
        const parent = node.parentNode;
        getNodesOut(node);
        parent.normalize();
      });

  // Listeners.
  refs.input.addEventListener('keydown', detectEnter);
  element.addEventListener('click', detectAction);
  root.appendChild(element);

  const toggle = () =>
    element.classList.toggle('show')
      ? refs.input.focus()
      : clearSearch();

  const onFound = (callback) => onFoundCallback = callback;
  const clear = () => clearSearch();

  return {toggle, onFound, clear}
};
