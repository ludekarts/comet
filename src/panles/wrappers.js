import provider from "../data/provider";
import scrollbar from "perfect-scrollbar";
import {createElement, template} from "../tools/travrs";

const scaffold = `
  div.editor
    @header::div.header > "Wrap with template"
    @content::div.content
      button[data-action="math"] > "Math"
`;


export default (() => {

  let onMathWrappCallback, wrappers;

  const [element, refs] = template(scaffold);
  scrollbar.initialize(refs.content, {maxScrollbarLength: 90});

  const newButton = ({tag, name}) =>
    createElement(`button[data-action="${name}"]`, name);

  const createContent = (source) =>{
    wrappers = source;
    source.forEach(wrapper => {
      refs.content.appendChild(newButton(wrapper))
    });
  }

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
  provider('wrappers').then(createContent).catch(console.error);

  // Listeners.
  element.addEventListener('click', detectAction);

  const onMathWrapp = (callback) => onMathWrappCallback = callback;

  return {element, onMathWrapp}
})();
