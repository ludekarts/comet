import path from "path";
import {remote} from "electron";
import scrollbar from "perfect-scrollbar";
import wrappers from "../data/wrappers.json";
import {jsonLoader, exist} from "../tools/io";
import {createElement, template} from "../tools/travrs";

const scaffold = `
  div.editor
    @header::div.header > "Wrap with template"
    @content::div.content
      button[data-action="math"] > "Math"
`;

const wrappersUrl = remote.app.getPath('home') + path.sep + 'comet.config.json';

export default (() => {

  let onMathWrappCallback;

  const [element, refs] = template(scaffold);
  scrollbar.initialize(refs.content, {maxScrollbarLength: 90});

  const newButton = ({tag, name}) =>
    createElement(`button[data-action="${tag}"]`, name);

  const createContent = (source) =>
    source.forEach(wrapper => {
      refs.content.appendChild(newButton(wrapper))
    });

  const addMoreTemplates = (response) => {
    if (response === false) return;
    createContent(response.wrappers);
    response.wrappers.forEach(wrapper => wrappers.push(wrapper));
  };

  const wrapSelection = ({tag, attrs}, selection) => {
    const range = selection.getRangeAt(0);
    range.surroundContents(createElement(`span[data-inline="${tag}" ${attrs}]`));
  };

  const detectAction = ({target}) => {
    const action = target.dataset.action;
    const selection = document.getSelection();
    // Exit.
    if (!action || selection.toString().length === 0) return;
    // Wrap Math.
    if (action === 'math' && onMathWrappCallback) onMathWrappCallback(selection);
    // Wrap Others.
    const index = wrappers.findIndex(wrapper => wrapper.name === action);
    if(~index) wrapSelection(wrappers[index], selection);
  };

  // Add wrappers.
  createContent(wrappers);

  // Load wrappers from config.
  exist(wrappersUrl)
    .then(flag => flag && jsonLoader(wrappersUrl))
    .then(addMoreTemplates);

  // Listeners.
  element.addEventListener('click', detectAction);

  const onMathWrapp = (callback) => onMathWrappCallback = callback;

  return {element, onMathWrapp}
})();
