
export const addComand = (commad, buffer = '', content) => {
  const selection = window.getSelection();
  const cnode = document.createTextNode(commad + (content ? `{${content}}` : ''));
  const range = selection.getRangeAt(0);
  range.setStart(range.commonAncestorContainer, range.endOffset - buffer.length);
  range.setEnd(range.commonAncestorContainer, range.endOffset);
  range.deleteContents();
  range.insertNode(cnode);
  range.setStartAfter(cnode);
  range.setEndAfter(cnode);
  return cnode;
};

export const wrapCommand = (command, buffer) => new Promise((resolve) => {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const selectedText = range.toString();
  range.deleteContents();
  addComand(command, buffer, selectedText);
  resolve();
});

export const switchCommands = (commands) => {
  let counter = -1;
  const end = commands.length - 1;
  return (start) => {
    counter = counter === end ? 0 : counter + 1;
    if (start) counter = start;
    return commands[counter];
  }
};
