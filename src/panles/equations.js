import scrollbar from "perfect-scrollbar";
import {hashCode, moveNodes} from "../tools/utils";
import {createElement, template} from "../tools/travrs";
import {renderMath, wrapMath, latexToMML} from "../tools/math";

const scaffold = `
  div.editor.equas
    @header::div.header > "Equations"
    @content::div.content
`;


export default (() => {

  const equations = [];
  const singleRender = latexToMML();
  const [element, refs] = template(scaffold);
  scrollbar.initialize(refs.content, {maxScrollbarLength: 90});


  const detectAction = ({target}) => {
    if (!target.dataset.hash) return;
    const hash = parseInt(target.dataset.hash);
    const equation = equations[equations.findIndex(math => math.hash === hash)];
    if (equation){
      const selection = document.getSelection();
      console.log(selection);

      console.log(equation);
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

  return {element, add}
})();
