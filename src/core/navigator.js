export default (selector) => {
  const api = {};
  let pointer = -1;
  let end, currentElement, elements = [];

  api.clear = () => {
    elements.forEach(eq => eq = null);
    elements = [];
    return api;
  };

  api.next = () => {
    if (currentElement) currentElement.classList.remove('selected');
    pointer = pointer === end ? 0 : pointer + 1;
    currentElement = elements[pointer];
    currentElement.classList.add('selected');
    return currentElement;
  };

  api.prev = () => {
    if (currentElement) currentElement.classList.remove('selected');
    pointer = pointer < 0 ? end : pointer - 1;
    currentElement = elements[pointer];
    currentElement.classList.add('selected');
    return currentElement;
  };

  api.set = (element) => {
    const index = elements.indexOf(element);
    if (~index) {
      pointer = index - 1;
      api.next();
    }
    return api;
  };

  api.select = (selector) => {
    api.clear();
    elements = Array.from(document.querySelectorAll(selector));
    end = elements.length - 1;
    return api;
  };

  api.deselect = () => {
    currentElement.classList.remove('selected');
    pointer = pointer - 1;
    return api;
  };

  api.current = () => currentElement;

  return api;
};
