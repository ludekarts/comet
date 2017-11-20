// Vendors.
import scrollbar from "perfect-scrollbar";

// Core.
import Search from "./search";
import Navigator from "./navigator";

// Parser.
import toHTML from "../parser/tohtml";
import {toXML, cleanMath} from "../parser/toxml";

// Tools.
import wrapp from "../tools/wrapp";
import {fileLoader} from "../tools/io";
import minimate from "../tools/minimate";
import {createElement} from "../tools/travrs";
import {renderMath, wrapMath, updateMath} from "../tools/math";
import {Memo, getPath, formatXml, classie} from "../tools/utils";

// Editors.
import latex from "../editors/latex";
import mediaEditor from "../editors/media";
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

// Selectors for the editors.
const editors = {
  'div[data-type=media]': mediaEditor,
  'span[data-inline=link]': attribsEditor,
  'span[data-inline=term]': attribsEditor,
  'span[data-inline=foreign]': attribsEditor,
  'span[data-inline=emphasis]': attribsEditor,
};

const editorsList = Object.keys(editors);

// Ignore click events for those nodes.
const ignoreNodes = [
  'body',
  'main',
  'div[data-type=figure]',
  'div[data-type=section]'
];

// Configure some of the Componets.
latexEditor.applyMath(mml => {
  const node = navigator.current();
  node.dataset.type === 'math' && updateMath(node, mml);
});

search.onFound(() => navigator.select('span.found'));

// Helpers.
const getName = (node) => node.dataset.type || node.dataset.inline;
const hasEditor = (node) => !!editorsList.find(selector => node.matches(selector));
const getSelector = (node) => node.dataset.type
  ? `div[data-type=${node.dataset.type}]`
  : `span[data-inline=${node.dataset.inline}]`;


// ---- Glue Logic ----------------

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

  breadcrumbs.innerHTML = path
    .reverse()
    .filter(node => node.dataset.type || node.dataset.inline)
    .reduce(
      (result, node, index) =>
        result +=`
        <span class="breadcrumb" data-num="${index}">
          ${node.dataset.type || node.dataset.inline}
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


const editMeta = ({target}) => {
  if (target.matches && target.matches('div[data-type=metadata]')) {
    target.classList.toggle('expand');
  }
}

const editNode = ({target, altKey}) => {
  if (ignoreNodes.find(selector => target.matches(selector))) return;
  // console.log(target); // Debug.
  if (target.dataset.type === 'math') {
    navigator.select('span.jax-math').set(target);
    displayPath(target);
    search.clear();
    return;
  }

  if (hasEditor(target)) {
    const selector = getSelector(target);
    currentEditor = editors[selector];
    // Fail gracefully.
    if (!currentEditor) return console.warn(`Canont find editor for "${selector}" selector.`);
    // Run Editor.
    sidePanel.classList.add('show');
    sidePanel.firstElementChild && sidePanel.removeChild(sidePanel.firstElementChild);
    sidePanel.appendChild(currentEditor.element);
    currentEditor.edit(target, getName(target));
    navigator.select(selector).set(target);
    search.clear();
    displayPath(target);
  }
  else {
    displayPath(activeNode(target.dataset.empty ? target : window.getSelection().anchorNode.parentNode));
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
      if (output.classList.toggle('show')) {
        output.firstElementChild.value = formatXml(toXML(cleanMath(editor.firstElementChild.cloneNode(true))));
      }
      break;
  }
};

const keyboard = (event) => {
  const {keyCode, key} = event;

  if (key === 'F3') search.toggle();
  if (key === 'F2') latexEditor.toggle();

  // Escape.
  if (keyCode === 27) {
    !sidePanel.classList.contains('show') && navigator.deselect();
    sidePanel.classList.remove('show') ;
    output.classList.remove('show');
    currentEditor = undefined;
  }

  // Tab.
  if (keyCode === 9) {
    // Make selection.
    event.preventDefault();
    navigator.next().scrollIntoView();
    editor.scrollTop = editor.scrollTop - 80;

    // Use editor
    if (currentEditor) {
      const node = navigator.current();
      const name = getName(node);
      // Update editor with new selected node if not 'math'.
      name !== 'math' && currentEditor.edit(node, name);
    }
  }
};

const outputHandlers = ({target}) => {
  const action = target.dataset.action;
  if (!action) return;
  if (action === 'copy') {
    output.firstElementChild.select();
    document.execCommand('copy');
    minimate(output.querySelector('span.message')).add('show').remove('show', 2);
  }
};

editor.addEventListener('click', editNode);
editor.addEventListener('dblclick', editMeta);
output.addEventListener('click', outputHandlers);
menu.addEventListener('click', detectAction);
document.addEventListener('keydown', keyboard);
