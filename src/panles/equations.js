import scrollbar from "perfect-scrollbar";
import {hashCode, moveNodes} from "../tools/utils";
import {createElement, template} from "../tools/travrs";
import {renderMath, wrapMath, latexToMML} from "../tools/math";

const scaffold = `
  div.editor.equas
    @header::div.header > "Equations"
    @content::div.content
`;


export default (editor) => {

  const equations = [];
  const singleRender = latexToMML();
  const [element, refs] = template(scaffold);

  let onPlaceMMLCallback, onPlaceLatexCallback;

  scrollbar.initialize(refs.content, {maxScrollbarLength: 90});

  const detectAction = ({target}) => {
    if (!target.dataset.hash) return;
    const hash = parseInt(target.dataset.hash);
    const equation = equations[equations.findIndex(math => math.hash === hash)];
    if (equation) {
      const selection = document.getSelection();
      if (selection.anchorNode && editor.contains(selection.anchorNode))
        onPlaceMMLCallback && onPlaceMMLCallback(equation.mml);
      else
        onPlaceLatexCallback && onPlaceLatexCallback(equation.latex);
    }
  };

  // Listeners.
  element.addEventListener('click', detectAction);

  // API Methods.
  const add = (mml, latex) => {
    const hash = hashCode(latex);
    if (!~equations.findIndex(math => math.hash === hash)) {
      equations.push ({hash, latex, mml});
      singleRender(latex)
        .then(node =>
          refs.content.appendChild(
            moveNodes(node, createElement(`button.math[data-hash="${hash}"]`))
          )
        );
    }
  };

  const onPlaceMML = (callback) => onPlaceMMLCallback = callback;
  const onPlaceLatex = (callback) => onPlaceLatexCallback = callback;

  return {element, add, onPlaceLatex, onPlaceMML}
};
