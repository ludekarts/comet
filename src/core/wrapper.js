import wrapp from "../tools/wrapp";
import {singleMathRender} from "../tools/math";
import {attrsTemplates} from "../templates/attrs";
import {template, createElement} from "../tools/travrs";

const scaffold = `
  div.nodeWrapper >
    @input
`;

export default (function Wrapper () {

  const state = {
    currentTarget: undefined,
    onAddMathCallback: undefined,
  }
  const refs = { input: createElement('input') };
  const element = template(refs, scaffold);

  const attrsFromTemplate = (attrs, input, excluded = []) => {
    return ((attrs[input.slice(1, input.length)] || '')
      .match(/[\w-:]+=".+?"/g) || [])
      .map(el => el.replace(/"/g,'').split('='))
      .filter(([name]) => !~excluded.indexOf(name))
  };

  const getElement = (label) => {
    // Handle templates.
    if (label.indexOf('@') === 0) {
      const node = createElement(label.slice(1, label.length));
      attrsFromTemplate(attrsTemplates, label).forEach(([name, value]) => node.setAttribute(name, value));
      return node;
    }
    else return createElement((label === 'link') ? 'reference' : link);
  };

  const wrapWithMath = () => {
    const math = singleMathRender(state.currentTarget.textContent);
    math.dataset.type = 'math';
    math.className = 'jax-math';
    math.setAttribute('contenteditable', false);
    state.currentTarget.parentNode.replaceChild(math, state.currentTarget);
    state.currentTarget = null;
    if (state.onAddMathCallback) state.onAddMathCallback();
  }

  const show = ({target}) => {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    if (!target.closest('#editor') && selectedText.length === 0) return;
    if (/\s/.test(selectedText.slice(-1))) selection.modify("extend", "backward", "character");
    state.currentTarget = wrapp.selection('wrapp');
    element.classList.add('show');
    refs.input.focus();
  }

  const hide = () => {
    if (state.currentTarget && state.currentTarget.matches('wrapp')) wrapp.remove(state.currentTarget);
    element.classList.remove('show');
  }

  const confirm = ({keyCode}) => {
    if (keyCode === 13) {
      const range = new Range();
      range.selectNodeContents(state.currentTarget);
      refs.input.value === '@m'
        ? wrapWithMath()
        : (range.surroundContents(getElement(refs.input.value)), wrapp.remove(state.currentTarget));
      hide();
    }
  }

  const onAddMath = (callback) => {
    state.onAddMathCallback = callback;
  };

  refs.input.addEventListener('keydown', confirm);

  return { element, onAddMath, show, hide }
}());
