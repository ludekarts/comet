import {splitAt, inDeltaTime} from "../tools/utils";
import {createElement, template} from "../tools/travrs";

const scaffold = `
  div.mediaEditor
    @header::div.header > "Media edit"
    div.input[label="src"]
      @src::input[type="text" value=""]
    div.input[label="alt text"]
      @alt::textarea
    div.footer
      button.flat.save[data-action="save"] > "Save"
`;

export default ((root) => {

  let currentElement;
  const [element, refs] = template(scaffold);

  const edit = (node) => {
    currentElement = node.matches('div[data-type=figure]') ? node.firstElementChild : node;
    refs.alt.value = currentElement.getAttribute('alt') || '';
    refs.src.value = currentElement.firstElementChild.getAttribute('src') || '';
  };

  const detectAction = ({target}) => {
    const action = target.dataset.action;
    if (!action) return;
    if (action === 'save' && refs.src.value.length > 0) {
      currentElement.setAttribute('alt', refs.alt.value);
      currentElement.firstElementChild.setAttribute('src', refs.src.value);
    }
  };

  // Listeners.
  element.addEventListener('click', detectAction);

  return {element, edit}
})();
