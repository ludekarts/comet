import {fuzzysearch} from "../../tools/utils";

// ---- Creators ----------------

export const createBuffer = () => {
  let buffer = '';
  return (key) => {
    // Update/Clear buffer.
    if (key.length === 1) buffer = /[a-zA-Z^\\]/.test(key) ? (buffer + key) : '';
    else if (key === 'Backspace') buffer = buffer.slice(0, -1);
    // console.log(buffer); // Debug.
    return [buffer, () => buffer = ''];
  }
};

export const createFilter = (operators, output) => (text) => {
  output.innerHTML = (text.length > 1)
    ? operators.reduce(
      (result, operator) => (
        (text.indexOf('\\') === 0)
        ? operator.indexOf(text) >= 0
        : fuzzysearch(text, operator)
      )
        ? result += `<li data-ops="${operator}"><i class="dot"></i> <span>${operator}</span></li>`
        : result
      ,''
    )
    : ''
};

export const createNavigator = (source, collection = []) => {
  let index = -1, active;
  return (direction) => {

    // Reset collection.
    if (direction === 0) collection = [];

    // Setup new collection.
    if(collection.length === 0) {
      collection = Array.from(source.querySelectorAll('li'));
      index = -1;
      active = undefined;
      // console.log('new', collection);
    }

    active && active.classList.remove('active');

    if (direction === -1) {
      index--;
      if (index < 0) index = collection.length -1;
    }
    else if (direction === 1) {
      index++;
      if (index === collection.length) index = 0;
    }

    active = collection[index];
    active && active.classList.add('active');

    return active;
  }
};
