import wrapp from "../tools/wrapp";
import scrollbar from "perfect-scrollbar";
import {splitAt, inDeltaTime} from "../tools/utils";
import {createElement, template} from "../tools/travrs";

const scaffold = `
  div.editor
    @header::div.header > "Inline edit"
    @content::div.content
      div.input.no-label
        @text::input[type="text" value=""]
      div.input.no-label
        @add::input[type="text" value=""]
        button.add[data-action="add"] > "+"
      hr
      @inputs::div
    div.footer
      button.warn[data-action="unwrap"] > "Unwrap"
      button.save[data-action="save"] > "Save"
`;

const attribute = (name, value) => template(`
  div.input[label="${name}"]
    input[type="text" value="${value}"]
    button.close[data-action="delete"] > "×"
`);


export default ((root) => {

  let currentElement, onCloseCallback;
  const [element, refs] = template(scaffold);
  const excludedAttrs = ['contenteditable', 'data-inline', 'data-select'];

  scrollbar.initialize(refs.content, {maxScrollbarLength: 90});

  const edit = (node, name) => {
    currentElement = node;
    // Clear panel.
    refs.inputs.innerHTML = '';
    // Header.
    refs.header.innerHTML = `Inline edit <span>${name}</span>`;
    // Content.
    refs.text.value = node.textContent;
    // Add attributes.
    Array.from(node.attributes).forEach(attr => {
      if (!excludedAttrs.includes(attr.name) && attr.value)
        refs.inputs.appendChild(attribute(attr.name, attr.value));
    });
  };

  const attrFromString = (string) => {
    const touple = splitAt(string.indexOf('='))(string);
    touple[0] = touple[0].trim().replace(/ /g, '-');
    touple[1] = touple[1].slice(1, touple[1].length).trim();
    return touple;
  };

  const detectAction = ({target}) => {
    const action = target.dataset.action;
    if (!action) return;

    if (action === 'add' && refs.add.value.length > 0) {
      refs.inputs.appendChild(attribute(...attrFromString(refs.add.value)));
      refs.add.value = '';
    }
    else if (action === 'save') {
      currentElement.textContent = refs.text.value;
      // Add & replace.
      const newAttibutes = Array.from(refs.inputs.querySelectorAll('input')).reduce((final, input) => {
        const name = input.parentNode.getAttribute('label');
        currentElement.setAttribute(name, input.value);
        final.push(name);
        return final;
      }, []);
      // Remove.
      Array.from(currentElement.attributes).forEach(attr => {
        if (!excludedAttrs.includes(attr.name) && !newAttibutes.includes(attr.name))
          currentElement.removeAttribute(attr.name);
      });
    }
    else if (action === 'delete') {
      refs.inputs.removeChild(target.parentNode);
    }
    else if (action === 'unwrap') {
      wrapp.remove(currentElement);      
      onCloseCallback && onCloseCallback();
    }
  };

  const onClose = (callback) => onCloseCallback = callback;

  // Listeners.
  element.addEventListener('click', detectAction);

  return {element, edit, onClose}
})();
