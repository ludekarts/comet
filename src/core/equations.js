import ps from "perfect-scrollbar";

import wrapp from "../tools/wrapp";
import {endCaret} from "../tools/caret";
import {base64, uid} from "../tools/utils";
import {template, createElement} from "../tools/travrs";
import {singleMathRender, singleMathPromise, wrapMath} from "../tools/math";

const scaffold = `
  aside#mathPanel >
    div.content
`;

export default (function EquationsLib () {

  const state = {
    hashes: [],
    equations : [],
    onAddMathCallback: undefined
  };

  const element = template(scaffold);

  const add = (latex, math) => {
    const mml =  math.querySelector('script').textContent;
    const hash = base64(mml);

    if (!~state.hashes.indexOf(hash)) {
      const id = uid();
      state.hashes.push(hash);
      state.equations[id] = {mml, latex};
      element.firstElementChild.insertBefore(
        createElement(`button[data-add="${id}"]`, singleMathRender(latex)),
        element.firstElementChild.firstChild
      );
      return true;
    }
    return false;
  };

  const equationHandler = ({target, altKey}) => {
    const id = target.dataset.add;
    if (!id) return;

    // Remove button.
    if (altKey) {
      const index = state.hashes.indexOf(base64(state.equations[id].mml));
      state.hashes.splice(index, 1);
      delete state.equations[id];      
      return target.parentNode.removeChild(target);
    }

    // Add equations
    const eq = state.equations[id];
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const parent = range.commonAncestorContainer.parentNode;
    if (parent.closest('#input')) {
      wrapp.selection(document.createTextNode(eq.latex));
    }
    else if (parent.closest('#editor')) {
      const math = wrapp.selection(singleMathRender(eq.latex), {
        'class': 'jax-math',
        'data-type': 'math',
        'contenteditable': 'false'
      });
      state.onAddMathCallback && state.onAddMathCallback(math);
    }
  };

  const onAddMath = (callback) => {
    state.onAddMathCallback = callback;
  };

  ps.initialize(element);
  element.addEventListener('click', equationHandler);
  const hide = () => element.classList.remove('show');
  const toggle = () => element.classList.toggle('show');

  return { element, add, onAddMath, toggle, hide }
}());
