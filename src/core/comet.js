// Vendors.
import scrollbar from "perfect-scrollbar";

// Tools.
import latex from "../latex";
import Search from "./search";
import wrapp from "../tools/wrapp";
import Navigator from "./navigator";
import toHTML from "../parser/tohtml";
import fileLoader from "../tools/fileLoader";
import {createElement} from "../tools/travrs";
import {toXML, cleanMath} from "../parser/toxml";
import {Memo, getPath, formatXml} from "../tools/utils";
import {renderMath, wrapMath, updateMath2} from "../tools/math";

// Editors.
import attribsEditor from "../editors/attributes";

// UI references.
const menu = document.querySelector('#menu');
const editor = document.querySelector('main');
const output = document.querySelector('output');
const sidePanel = document.querySelector('aside');
const breadcrumbs = document.querySelector('#breadcrumbs');
const latexEditor = latex(document.querySelector('latex'));

// Scrollbars.
scrollbar.initialize(editor, {maxScrollbarLength: 90});
scrollbar.initialize(output.firstElementChild, {maxScrollbarLength: 90});

// Globals.
let currentEditor;
const navigator = Navigator();
const search = Search(document.body, editor);
const nonEditables = [
  'div[data-type=media]',
  'div[data-type=image]',
  'span[data-type=math]',
  'span[data-inline=link]',
  'span[data-inline=term]',
  'span[data-inline=foreign]',
  'span[data-inline=emphasis]'
];
const editors = {
  link: attribsEditor,
  term: attribsEditor,
  // media: mediaEditor,
  // image: mediaEditor,
  foreign: attribsEditor,
  emphasis: attribsEditor,
};



latexEditor.applyMath(mml => {
  const node = navigator.current();
  node.dataset.type === 'math' && updateMath2(node, mml);
});

search.whenFound(() => navigator.select('span.found'));

const reRenderMath = (editor) =>
  renderMath(editor).then(() => wrapMath(editor));

const parse = (xml) => {
  editor.innerHTML = '';
  editor.appendChild(toHTML(xml));
  reRenderMath(editor);
};

// Load Files.
fileLoader("C:\\Users\\Ludek\\Desktop\\sample.cnxml").then(parse).catch(console.error);


const displayPath = (root) => {
  const path = getPath(root);
  breadcrumbs.innerHTML = path.reverse().reduce(
    (result, node, index) =>
      result +=`
      <span class="breadcrumb" data-num="${index}">
        ${node.dataset ? (node.dataset.type || node.dataset.inline) : node.tagName.toLowerCase()}
      </span> » `, ''
  ).slice(0, -3);
};

const activeNode = Memo((current, active) => {
  if (active !== current) {
    if (active) {
       active.contentEditable = false;
      if (active.dataset) active.dataset.empty = false;
      if (active.textContent.length === 0) active.dataset.empty = true;
    }
    active = current;
    active.contentEditable = true;
  }
  return active;
});

const getName = (node) => node.dataset.type || node.dataset.inline;
const isExcluded = (node) => !!nonEditables.find(selector => node.matches(selector));
const getSelector = (node) => node.dataset.type
  ? `div[data-type="${node.dataset.type}"]`
  : `span[data-inline="${node.dataset.inline}"]`;

const editNode = ({target, altKey}) => {
  if (target === document.body) return;

  // Trace target DOM path.
  if (!isExcluded(target)) {
    displayPath(activeNode(target.dataset.empty ? target : window.getSelection().anchorNode.parentNode));
  }
  else if (target.dataset.type === 'math') {
    navigator.select('span.jax-math').set(target);
    displayPath(target);
  }
  else {
    const name = getName(target);
    sidePanel.classList.add('show');
    sidePanel.firstElementChild && sidePanel.removeChild(sidePanel.firstElementChild);
    currentEditor = editors[name];
    sidePanel.appendChild(currentEditor.element);
    currentEditor.edit(target, name);
    navigator.select(getSelector(target)).set(target);
    displayPath(target);
  }
};

const detectAction = ({target}) => {
  const action = target.dataset.action;
  if (!action) return;

  switch (action) {
    case 'latex':
      editor.style.bottom = latexEditor.toggle() ? '240px' : '29px';
      break;
    case 'output':
      if (output.classList.toggle('show'))
      output.firstElementChild.value = formatXml(toXML(cleanMath(editor.firstElementChild.cloneNode(true))))
      break;
  }
};

const keyboard = (event) => {
  const {keyCode, key} = event;

  if (key === 'F3') {
    search.toggle();
  }

  // Escape.
  if (keyCode === 27) {
    sidePanel.classList.remove('show');
    output.classList.remove('show');
    currentEditor = undefined;
    navigator.deselect();
  }

  // Tab.
  if (keyCode === 9) {
    // Make selection.
    event.preventDefault();
    navigator.next().scrollIntoView();
    editor.scrollTop = editor.scrollTop - 60;

    // Use editor
    if (currentEditor) {
      const node = navigator.current();
      const name = getName(node);
      // Update editor with new selected node if not 'math'.
      name !== 'math' && currentEditor.edit(node, name);
    }
  }
};

editor.addEventListener('click', editNode);
menu.addEventListener('click', detectAction);
document.addEventListener('keydown', keyboard);
