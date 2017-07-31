import {updateMath2, updateMath} from "../tools/math";

export default function Navigator (selector) {
  let end, current, equations = [];
  let pointer = -1;

  const clear = () => {
    equations.forEach(eq => eq = null);
    equations = [];
  };

  const next = () => {
    if (current) current.classList.remove('active');
    pointer = pointer === end ? 0 : pointer + 1;
    current = equations[pointer];
    current.classList.add('active');
    return current;
  };

  const prev = () => {
    if (current) current.classList.remove('active');
    pointer = pointer < 0 ? end : pointer - 1;
    current = equations[pointer];
    current.classList.add('active');
    return current;
  };

  const update = (latex) =>
    updateMath(latex, current);

  const add = (latex) =>
    console.log('add', latex);

  const set = (element) => {
    const index = equations.indexOf(element);
    if (~index) {
      pointer = index - 1;
      next();
    }
  };

  const select = (selector) => {
    clear();
    equations = Array.from(document.querySelectorAll(selector));
    end = equations.length - 1;
  };

  return {select, add, set, next, prev, update};
};
