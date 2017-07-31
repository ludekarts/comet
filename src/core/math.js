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

  const placeEquation = (event) => {
    const id = event.target.dataset.add;
    if (!id) return;
    const eq = state.equations[id];
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const target = range.commonAncestorContainer.parentNode;
    if (target.closest('#input')) {
      wrapp.selection(document.createTextNode(eq.latex));
    }
    else if (target.closest('#editor')) {
      singleMathPromise(eq.latex).then((render) => {
        const math = wrapp.selection(wrapMath(render).firstElementChild);
        state.onAddMathCallback && state.onAddMathCallback(math);
      })
    }
  };

  const onAddMath = (callback) => {
    state.onAddMathCallback = callback;
  };

  ps.initialize(element);
  element.addEventListener('click', placeEquation);
  const toggle = () => element.classList.toggle('show');
  const hide = () => element.classList.remove('show');

  return { element, add, onAddMath, toggle, hide }
}());
