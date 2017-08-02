// Set caret at the end og given element.
export const endCaret = (element) => {
  const selection = window.getSelection();
  const range = document.createRange();
  const handle = element.nodeType === 3 ? element : element.lastChild;
  try {
    range.setStart(handle, handle.textContent.length);
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
  const handle = element.nodeType === 3 ? element : element.firstChild;
  try {
    range.setStart(handle, 0);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  } catch (e) {
    // TODO: handle this better.
  }
};
