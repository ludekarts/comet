import {copyAttrs} from "tools/utils";
import {createElement} from "tools/travrs";

export default function toHtml(source) {

  const processXml = source
    // Remove MathML namespace.
    .replace(/<(\/?)m:/g, (match, slash) => ~match.indexOf('<') ? ('<' + slash) : '');

  // Instantiate XML parser.
  const parser = new DOMParser();
  const xml = parser.parseFromString(processXml, "application/xml");
  const content = xml.querySelector('content') || xml;

  // Do not pars those elements.
  const excluded = ['math', 'term', 'emphasis'];

  // Create new 'x-tag' element from the Editable element.
  const cloneElement = (clone, node) => {

    // Copy text node.
    if (node.nodeType === 3) return clone.appendChild(document.createTextNode(node.textContent));

    // Create new child.
    const newChild = node.nodeType !== 3
      ? node.tagName && !~excluded.indexOf(node.tagName.toLowerCase())
        ? createElement(`div[data-type="${node.tagName}"]`)
        : node.cloneNode(true)
      : document.createTextNode(node.textContent);

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

  return clone(xml, createElement('div'))
};
