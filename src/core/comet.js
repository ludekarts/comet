// Vendors.
import scrollbar from "perfect-scrollbar";

// Tools.
import latex from "../tools/latex";
import {Memo} from "../tools/utils";
import toHTML from "../parser/tohtml";
import fileLoader from "../tools/fileLoader";
import {renderMath, wrapMath} from "../tools/math";

// UI references.
const menu = document.querySelector('#menu');
const editor = document.querySelector('main');
const breadcrumbs = document.querySelector('#breadcrumbs');
const latexEditor = latex(document.querySelector('latex'));

// Scrollbars.
scrollbar.initialize(editor, {maxScrollbarLength: 90});


function reRenderMath(editor) {
  renderMath(editor).then(() => {
    wrapMath(editor);
    // navigator.select('span.jax-math');
  });
}

const parse = (xml) => {
  editor.innerHTML = '';
  editor.appendChild(toHTML(xml));
  reRenderMath(editor);
};

// Load Files.
fileLoader("C:\\Users\\Ludek\\Desktop\\sample.cnxml").then(parse).catch(console.error);

const getPath = (node, path = [node]) => {
  if (!node.parentNode.matches('div[content=true]')) {
    path.push(node.parentNode);
    return getPath(node.parentNode, path)
  }
  return path;
};

const displayPath = (root) => {
  const path = getPath(root);
  breadcrumbs.innerHTML = path.reverse().reduce(
    (result, node, index) => result +=`<span class="breadcrumb" data-num="${index}">${node.dataset.type || node.tagName.toLowerCase()}</span> » `
    , ''
  ).slice(0, -3);
};

const activeNode = Memo((current, active) => {
  if (active !== current) {
    if (active) {
       active.contentEditable = false;
       active.dataset.empty = false;
      if (active.textContent.length === 0) active.dataset.empty = true;
    }
    active = current;
    active.contentEditable = true;
    displayPath(active);
  }
  return active;
});


const editNode = ({target, altKey}) => {
  activeNode(target.dataset.empty ? target : window.getSelection().anchorNode.parentNode);
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
