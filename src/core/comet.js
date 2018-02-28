// Electron.
// Electron.
import {remote} from "electron";

// Vendors.
import scrollbar from "perfect-scrollbar";

console.log(scrollbar);
// Core.
import Search from "./search";
import Navigator from "./navigator";

// Parser.
import toHTML from "../parser/tohtml";
import {toXML, cleanMath} from "../parser/toxml";

// Tools.
import wrapp from "../tools/wrapp";
import minimate from "../tools/minimate";
import {createElement} from "../tools/travrs";
import {xmlLoader, saveFile} from "../tools/io";
import {renderMath, wrapMath, updateMath} from "../tools/math";
import {
  Memo, getPath, formatXml, loopstack, pause, clipboard,
  debounce, getChildOffsteAt, getSelectionRange
} from "../tools/utils";

// Editors.
import latexInit from "../editors/latex";
import mediaEditor from "../editors/media";
import attribsEditor from "../editors/attributes";

// Panles.
import help from "../panles/help";
import spinner from "../panles/spinner";
import equations from "../panles/equations";
import wrappersPanel from "../panles/wrappers";

// UI references.
const menu = document.querySelector('#menu');
const latex = document.querySelector('latex');
const editor = document.querySelector('main');
const header = document.querySelector('header');
const output = document.querySelector('output');
const sidePanel = document.querySelector('aside');
const breadcrumbs = document.querySelector('#breadcrumbs');

// Setup.
const history = loopstack(25);
const latexEditor = latexInit(latex);
const clip = clipboard(document.body);
const helpPanel = help(document.body);
const equationsPanel = equations(editor);
const spinnerPanel = spinner(document.body);

// Scrollbars.
scrollbar.initialize(editor, {maxScrollbarLength: 90});
scrollbar.initialize(output.firstElementChild, {maxScrollbarLength: 90});

// Globals.
let currentEditor, lastSelectedNode;
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

// Editor list for quick reference.
const editorsList = Object.keys(editors);

// Ignore click events for those nodes.
const ignoreNodes = [
  'body',
  'main',
  'logo',
  'div[data-type=figure]',
  'div[data-type=section]'
];

// ---- Helpers ----------------

const getName = (node) => node.dataset.type || node.dataset.inline;
const hasEditor = (node) => !!editorsList.find(selector => node.matches(selector));
const getSelector = (node) => node.dataset.type
  ? `div[data-type=${node.dataset.type}]`
  : `span[data-inline=${node.dataset.inline}]`;

const recordState = () => {
  const content = editor.cloneNode(true).innerHTML;
  if (content !== history.head()) history.push(content);
};
const saveHistory = pause(recordState, 1000);
const restoreState = () => {
  const snapshot = history.pull();
  if (snapshot) editor.innerHTML = snapshot;
};


// ---- Glue Logic ----------------

const insertMath = (mml) => {
  const math = wrapp.selection(createElement('span'), {
    'class': 'jax-math',
    'data-type': 'math',
    'contenteditable': 'false'
  });
  updateMath(math, mml).then(recordState);
};

const parse = (xml) => {
  if (!xml) return;
  editor.innerHTML = '';
  toggleSpinner().then(() => {
    editor.appendChild(toHTML(xml));
    renderMath(editor).then(wrapMath).then(recordState).then(toggleSpinner);
  })
};

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

const swapSidePanel = (content) => {
  sidePanel.classList.add('show');
  sidePanel.firstElementChild && sidePanel.removeChild(sidePanel.firstElementChild);
  sidePanel.appendChild(content);
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

const editNode = ({target, ctrlKey}) => {
  // console.log(target); // Debug.
  const isMath = target.matches('span.jax-math');

  // Handel open file button.
  if (target.matches('span.open')) return toggleFileLoader();

  // Skip ignoreNodes.
  if (ignoreNodes.find(selector => target.matches(selector))) return;

  // Handel Maths.
  if (target.dataset.type === 'math') {
    navigator.select('span.jax-math').set(target);
    displayPath(target);
    search.clear();

    // Copy MML to the clipboard.
    ctrlKey && isMath && clip(target.querySelector('span[data-mathml]').dataset.mathml);
    return;
  }

  // Handel inline elements.
  if (hasEditor(target)) {
    const selector = getSelector(target);
    currentEditor = editors[selector];
    // Fail gracefully.
    if (!currentEditor) return console.warn(`Canont find editor for "${selector}" selector.`);
    // Run Editor.
    swapSidePanel(currentEditor.element);
    currentEditor.edit(target, getName(target));
    navigator.select(selector).set(target);
    search.clear();
    displayPath(target);
  }

  // Handel edit node selection.
  else {
    displayPath(activeNode(target.dataset.empty ? target : window.getSelection().anchorNode.parentNode));
    // Copy element ID.
    ctrlKey && !isMath && target.id && clip(target.id);
  }
};

const detectAppAction = ({target}) => {
  const action = target.dataset.action;
  if (!action) return;
  else if (action === 'close') remote.getCurrentWindow().close();
  else if (action === 'maximize') remote.getCurrentWindow().maximize();
  else if (action === 'minimize') remote.getCurrentWindow().minimize();
}

// ---- Components configuration ----------------

// Select founded text string.
search.onFound(() => navigator.select('span.found'));

// Replace selected MathJax equation.
latexEditor.onMathApply((mml, latex) => {
  const node = navigator.current();
  if (node.dataset.type !== 'math') return;
  updateMath(node, mml).then(recordState);
  equationsPanel.add(mml, latex);
});

// Convert selected text into math.
wrappersPanel.onMathWrapp((selection) => latexEditor.render(selection).then(insertMath));

// Hide Attributes editor on it's demand (in this case onUnwrap).
attribsEditor.onClose(() => sidePanel.classList.remove('show'));

// Save history whwn attributes are saved.
attribsEditor.onSave(() => recordState());

// Place LaTeX formula from equationsPanel into latexEditor.
equationsPanel.onPlaceLatex((latex) => latexEditor.addFormula(latex));

// Insert MathJax node into CNXML content.
equationsPanel.onPlaceMML(insertMath);

// ---- Toggle Panels ----------------

const toggleLatex = () =>
  (editor.style.bottom = latexEditor.toggle() ? '240px' : '29px');

const toggleOutput = () =>
  output.classList.toggle('show') &&
    (output.firstElementChild.value = formatXml(toXML(editor.firstElementChild.cloneNode(true))));

const toggleWrappers = () =>
  sidePanel.classList.toggle('show') && swapSidePanel(wrappersPanel.element);

const toggleEquations = () =>
  sidePanel.classList.toggle('show') && swapSidePanel(equationsPanel.element);

const toggleHelp = () => helpPanel.toggle();

const toggleSpinner = () =>
  new Promise((resolve) => (spinnerPanel.toggle(), setTimeout(resolve, 300)));

const toggleFileLoader = () =>
  xmlLoader().then(parse).catch(console.error);

const detectAction = ({target}) => {
  const action = target.dataset.action;
  if (!action) return;

  switch (action) {
    case 'latex':
      return toggleLatex();
    case 'output':
      return toggleOutput();
    case 'wraps':
      return toggleWrappers();
    case 'equs':
      return toggleEquations();
    case 'help':
      return toggleHelp();
  }
};

// ---- Keyboard shortcuts ----------------

const keyboard = (event) => {
  const {keyCode, key, altKey, ctrlKey, shiftKey, target} = event;
  const isEditable = !target.matches('input');


  // Function keys.
  if (key === 'F2') return toggleLatex();
  if (key === 'F3') return search.toggle();

  // Esc.
  if (keyCode === 27) {
    !sidePanel.classList.contains('show') && navigator.deselect();
    sidePanel.classList.remove('show');
    output.classList.remove('show');
    currentEditor = undefined;
    return;
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
    return;
  }

  // Ctrl + Z.
  if (ctrlKey && keyCode === 90 && isEditable) return (event.preventDefault(), restoreState());
  // Ctrl + H.
  if (ctrlKey && keyCode === 72) return toggleHelp();
  // Alt + W.
  if (altKey && keyCode === 87) return toggleWrappers();
  // Alt + X.
  if (altKey && keyCode === 88) return toggleOutput();

  // Ctrl + O.
  if (ctrlKey && keyCode === 79) return toggleFileLoader();
    // Ctrl + Space.
  if (ctrlKey && keyCode === 32) return (event.preventDefault(), toggleEquations());

  // Brackets & quotes wrapper.
  if (key === '[') (event.preventDefault(), wrapp.withText('[^]'));
  else if (key === '(') (event.preventDefault(), wrapp.withText('(^)'));
  else if (key === '{') (event.preventDefault(), wrapp.withText('{^}'));
  else if (key === '"') (event.preventDefault(), wrapp.withText('"^"'));
  else if (key === '\'') (event.preventDefault(), wrapp.withText('\'^\''));

  // Track edit changes.
  if (!ctrlKey && !shiftKey && keyCode !== 27 && keyCode !== 13 && isEditable) saveHistory();
};

const outputHandlers = ({target}) => {
  const action = target.dataset.action;
  if (!action) return;
  if (action === 'copy') {
    output.firstElementChild.select();
    document.execCommand('copy');
    minimate(output.querySelector('span.message')).add('show').remove('show', 2);
  }
  else if (action === 'save') {
    saveFile(output.firstElementChild.value);
  }
};


// ---- Listeners -----------------------

editor.addEventListener('click', editNode);
editor.addEventListener('dblclick', editMeta);
menu.addEventListener('click', detectAction);
output.addEventListener('click', outputHandlers);
header.addEventListener('click', detectAppAction);
document.addEventListener('keydown', keyboard);
