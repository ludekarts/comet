import {splitAt, inDeltaTime} from "../tools/utils";
import {createElement, template} from "../tools/travrs";

const scaffold = `
  form[onsubmit="\"return false;\""]
    @header::div.header > "Inline edit"
    div.input.no-label
      @content::input[type="text" value=""]
    div.input.no-label
      @add::input[type="text" value=""]
      button.add[data-action="add"] > "+"
    hr
    @inputs::div
    div.footer
      button.flat.save[data-action="save"] > "Save"
`;

const attribute = (name, value) => template(`
  div.input[label="${name}"]
    input[type="text" value="${value}"]
    button.close[data-action="delete"] > "×"
`);


export default ((root) => {

  let currentElement;
  const [element, refs] = template(scaffold);

  const edit = (node, name) => {
    currentElement = node;
    // Clear panel.
    refs.inputs.innerHTML = '';
    // Header.
    refs.header.innerHTML = `Inline edit <span>${name}</span>`;
    // Content.
    refs.content.value = node.textContent;
    // Add attributes.
    Array.from(node.attributes).forEach(attr => {
      if (attr.name !== 'contenteditable' && attr.name !== 'data-inline' && attr.value )
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
      currentElement.textContent = refs.content.value;
      // Add & replace.
      const newAttibutes = Array.from(refs.inputs.querySelectorAll('input')).reduce((final, input) => {
        const name = input.parentNode.getAttribute('label');
        currentElement.setAttribute(name, input.value);
        final.push(name);
        return final;
      }, []);
      // Remove.
      Array.from(currentElement.attributes).forEach(attr => {
        if (attr.name !== 'contenteditable' && attr.name !== 'data-inline' && !newAttibutes.includes(attr.name))
          currentElement.removeAttribute(attr.name);
      });
    }
    else if (action === 'delete') {
      refs.inputs.removeChild(target.parentNode);
    }
  };

  // Listeners.
  element.addEventListener('click', detectAction);

  return {element, edit}
})();
