// Vendors.
import scrollbar from "perfect-scrollbar";

// Tools.
import latex from "../latex";
import toHTML from "../parser/tohtml";
import fileLoader from "../tools/fileLoader";
import {Memo, getPath} from "../tools/utils";
import {renderMath, wrapMath} from "../tools/math";

// UI references.
const menu = document.querySelector('#menu');
const editor = document.querySelector('main');
const breadcrumbs = document.querySelector('#breadcrumbs');
const latexEditor = latex(document.querySelector('latex'));

// Scrollbars.
scrollbar.initialize(editor, {maxScrollbarLength: 90});

const excludeNodes = ['reference', 'term', 'emphasis', 'foreign', 'div[data-type=media]', 'div[data-type=image]'];

function reRenderMath(editor) {
  renderMath(editor).then(() => wrapMath(editor));
}

const parse = (xml) => {
  editor.innerHTML = '';
  editor.appendChild(toHTML(xml));
  Array.from(editor.querySelectorAll(excludeNodes.join(',')))
    .forEach(node => node.setAttribute('contentEditable', false))
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
        ${(node.dataset && node.dataset.type) || node.tagName.toLowerCase()}
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


const isExcluded = (node) => !!excludeNodes.find(selector => node.matches(selector));

const editNode = ({target, altKey}) => {

console.log(target);
  // Trace target DOM path.
  if (!isExcluded(target)){
    displayPath(activeNode(target.dataset.empty || target.matches('span[data-type=math]') ? target : window.getSelection().anchorNode.parentNode));
  }
  else {
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
  }
};

menu.addEventListener('click', detectAction);
editor.addEventListener('click', editNode);
