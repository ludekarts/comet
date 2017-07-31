// Set caret at the end og given element.
export const endCaret = (element) => {
  const selection = window.getSelection();
  const range = document.createRange();
  if (!element.lastChild) return;
  try {
    range.setStart(element.lastChild, element.lastChild.textContent.length);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  } catch (e) {
    // TODO: handle this better.
  }
};


// Set caret at the end og given element.
export const startCaret = (element) => {
  const selection = window.getSelection();
  const range = document.createRange();
  if (!element.firstChild) return;
  try {
    range.setStart(element.firstChild, 0);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  } catch (e) {
    // TODO: handle this better.
  }
};
