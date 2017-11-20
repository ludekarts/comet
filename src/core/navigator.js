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
    if (elements.length === 0) return currentElement;
    if (currentElement) currentElement.dataset.select = false;
    pointer = pointer === end ? 0 : pointer + 1;
    currentElement = elements[pointer];
    currentElement.dataset.select = true
    return currentElement;
  };

  api.prev = () => {
    if (elements.length === 0) return currentElement;
    if (currentElement) currentElement.dataset.select = false;
    pointer = pointer < 0 ? end : pointer - 1;
    currentElement = elements[pointer];
    currentElement.dataset.select = true;
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
    pointer = 0;
    return api;
  };

  api.deselect = () => {
    if (!currentElement) return api;
    currentElement.dataset.select = false;
    pointer = pointer - 1;
    return api;
  };

  api.current = () => currentElement;

  return api;
};
