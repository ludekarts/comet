import {createElement} from "../tools/travrs";
import {uid, copyAttrs, moveNodes} from "../tools/utils";

// ---- Helpers ----------------

// Find all Bridge-MathJax elements and extract MATHML markup.
export const cleanMath = (source) => {
  Array.from(source.querySelectorAll('span[data-mathml]')).forEach(element => {
    const parent = element.parentNode.classList.contains('MJXc-display') ? element.parentNode.parentNode : element.parentNode;
    const root = parent.parentNode;
    root.insertBefore(document.createRange().createContextualFragment(element.dataset.mathml), parent);
    root.removeChild(parent);
  });

  return source;
};

const excludeAttribs = [
  'data-type',
  'data-empty',
  'data-inline',
  'data-select',
  'contenteditable'
];

// Create new 'x-tag' element from the Editable element.
const cloneElement = (clone, node) => {

  // Copy text node.
  if (node.nodeType === 3)
    return clone.appendChild(document.createTextNode(node.textContent));

  const newChild = (node.tagName === 'math' || node.nodeType === 8)
    ? node.cloneNode(true)
    : createElement('x-' + (node.dataset.type || node.dataset.inline));

  // Copy attrinytes, excluding 'excludeAttribs'.
  copyAttrs(node, newChild, excludeAttribs);

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

// ---- Transformations ----------------

// Add namespace for math elements.
const transformMath = (node) =>
  node.outerHTML = node.outerHTML.replace(/<([^<>]+)>/g,
    (match, content) => ~match.indexOf('</') ? `</m:${content.substring(1)}>` : `<m:${content}>`
  );

const transformLinks = (node) =>
  node.textContent === 'link' && (node.innerHTML = '');

// Do not allow for line breake.
const removeNewLines = (node) => node.parentNode.removeChild(node);


// Ensure all ids are unique.
const transformUniqueIds = (collection = []) => (node) => {
  if (!~collection.indexOf(node.id)) collection.push(node.id) ;
  else {
    const newId = uid();
    node.id = newId;
    collection.push(newId);
  }
};


// Convert 'source' HTML tree into XML string.
export const toXML = (htmlNode) => {
  // Check for duplicate IDs.
  Array.from(htmlNode.querySelectorAll('*[id]')).forEach(transformUniqueIds([]));
  // Clone source HTML node.
  const sourceClone = cleanMath(htmlNode.cloneNode(true));
  // Transform new line.
  Array.from(sourceClone.querySelectorAll('br')).forEach(removeNewLines);

  // Create x-tag equivalents of CNXML. This will make easier
  // to translate CNXML elements that aren't compatible with HTML5
  const firstElement = sourceClone.firstElementChild.cloneNode();
  const root = createElement(firstElement.dataset.type || 'div');

  copyAttrs(firstElement, root, excludeAttribs);

  const xml = clone(sourceClone.firstElementChild, root).outerHTML
    // Remove 'x-' prefix at the end.
    .replace(/<x-|<\/x-/g, (x) => ~x.indexOf('<\/') ? '</' : '<')
    // Replace custim namespaces from templates.
    .replace(/::.*?="/g, match => match.replace('::', ':'))
    // Remove all non-breaking sapces.
    .replace(/&nbsp;/g, ' ');


  // Instantiate XML barser & serializer.
  const parser = new DOMParser();
  const serializer = new XMLSerializer();
  const cnxml = parser.parseFromString(xml, "application/xml");

  // Transform back some of the xml tags to be compatible with CNXML standard.
  Array.from(cnxml.querySelectorAll('math')).forEach(transformMath);
  Array.from(cnxml.querySelectorAll('link')).forEach(transformLinks);

  // Return final CNXML.
  return serializer.serializeToString(cnxml)
    // Remove unecesery xml namesapces form CNXML elements -> Leftovers from parsing & editing.
    .replace(/xmlns="http:\/\/www\.w3\.org\/1999\/xhtml"/g, '')
    // Remove MathML namespace -> from MatJax math updates.
    .replace(/\s*xmlns="http:\/\/www.w3.org\/1998\/Math\/MathML"/g, '')
    // Remove empty, active and Mathjax special 'class' atributes.
    .replace(/\s+class=(""|"active"|"MJX.*?")/g, '')
    // Remove all spaces between tags.
    .replace(/>\s*?</g, '><')
    // Remove all multiple spaces.
    .replace(/\s{2,}/g, ' ')
    // Replace old version ov CNXML.
    .replace("cnxml-version=\"0.7\"", "cnxml-version=\"0.8\"")
};
