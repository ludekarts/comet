
import attrStyle from "styles/attrs.css";

import ps from "perfect-scrollbar";
import {splitAt} from "tools/utils";
import {attrsTemplates} from "temps/attrs";
import {template, createElement} from "tools/travrs";

const scaffold = `
  aside#attrseditor
    div.add
      @input
      @addAttrs
      @saveAttrs
    @entries
`;

const entry = (name, value) => template (`
  div.entry >
    span > "${name}"
    input.entry[type="text" name="${name}" value="${value}"]`);

export default (function AttrsEditor () {

  const state = {
    currentElement: createElement('span')
  };

  const refs = {
    entries: createElement('form'),
    input: createElement('input[type="text"]'),
    addAttrs: createElement('button.addAttrs', '+'),
    saveAttrs: createElement('button.saveAttrs', '✔')
  };

  const element = template(refs, scaffold);

  const select = (target) => {
    state.currentElement.classList.remove('active');
    state.currentElement = target;
    refs.entries.innerHTML = '';
    Array.from(target.attributes).forEach(attr => {
      refs.entries.appendChild(entry(attr.name, attr.value));
    });
    element.classList.add('show');
    state.currentElement.classList.add('active');
  };

  const attrsFromTemplate = (attrs, input, excluded = []) => {
    return ((attrs[input.slice(1, input.length)] || '')
      .match(/[\w-:]+=".+?"/g) || [])
      .map(el => el.replace(/"/g,'').split('='))
      .filter(([name]) => !~excluded.indexOf(name))
  };

  const attrFromString = (string) => {
    const touple = splitAt(string.indexOf('='))(string);
    touple[1] = touple[1].slice(1, touple[1].length);
    return touple;
  }

  const addAttribute = () => {
    const input = refs.input.value;
    const form = new FormData(refs.entries);
    const available = Array.from(form.keys());

    if (input.length === 0) return;

    if (input.indexOf('@') === 0)
      attrsFromTemplate(attrsTemplates, input, available)
        .forEach(([name, value]) => refs.entries.appendChild(entry(name, value)));
    else
      refs.entries.appendChild(entry(...attrFromString(input)));
  };

  const saveAttribute = () => {
    const form = new FormData(refs.entries);
    if (state.currentElement) {
      Array.from(state.currentElement.attributes).forEach(attr => state.currentElement.removeAttribute(attr.name));
      for (let [key, value] of form.entries()) {
        state.currentElement.setAttribute(key, value);
      }
    }
  };

  // Remove attribute entry. Alt + Delete.
  const deleteEntries = ({target, keyCode, altKey}) => {
    if (altKey && keyCode === 46 && target.matches('input.entry')) {
      refs.entries.removeChild(target.parentNode);
    }
  };

  const hide = () => {
    element.classList.remove('show');
    state.currentElement.classList.remove('active');
  }

  element.addEventListener('keydown', deleteEntries);
  refs.addAttrs.addEventListener('click', addAttribute);
  refs.saveAttrs.addEventListener('click', saveAttribute);

  ps.initialize(element);
  return { element, select, hide };
}());