import {copyAttrs} from "../tools/utils";
import {createElement} from "../tools/travrs";


// Do not pars those elements.
const inlineElements = ['link', 'term', 'emphasis', 'foreign', 'sub', 'sup', 'quote'];

// Create new 'x-tag' element from the Editable element.
const cloneElement = (clone, node) => {
  // Copy text node.
  if (node.nodeType === 3) return clone.appendChild(document.createTextNode(node.textContent));

  // Clone math, block and inline elements.
  const newChild = (node.tagName === 'math' || node.nodeType === 8)
    ? node.cloneNode(true)
    : node.tagName && !~inlineElements.indexOf(node.tagName.toLowerCase())
      ? createElement(`div[data-type="${node.tagName}"]`)
      : createElement(`span[data-inline="${node.tagName}"]`,
        node.textContent.length === 0
          ? node.tagName.toLowerCase()
          : node.cloneNode(true)
        );

  // Copy attrinytes;
  copyAttrs(node, newChild);

  // Appned x-tag.
  clone.appendChild(newChild);
};

// Clone structure.
const clone = (node, double) => {
  Array.from(node.childNodes).forEach((child, index) => {
    if (!double.childNodes[index]) cloneElement(double, child);
    if (child.firstChild) clone(child, double.childNodes[index]);
  });
  return double;
};

// ---- Main ----------------

export default function toHtml(source) {
  const processXml = source
    // Remove newline chatacters.
    .replace(/\n/g, '')
    // Remove multiple spaces.
    .replace(/  +/g, ' ')
    // Remove spaces netween tags.
    .replace(/(>\s+?<)/g, '><')
    // Remove MathML namespace.
    .replace(/<(\/?)m:/g, (match, slash) => ~match.indexOf('<') ? ('<' + slash) : '');

  // Instantiate XML parser.
  const parser = new DOMParser();
  const xml = parser.parseFromString(processXml, "application/xml");
  const output = clone(xml, createElement('div'));
  output.setAttribute('content', true);

  return output;
};
