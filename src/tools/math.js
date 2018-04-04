import wrapp from "./wrapp";

/**
 * Wrap MathJax equations in clickable wrapper.
 * @param  {HTMLElement} content Element contining equations.
 * @return {HTMLElement}         Reference to content.
 */
export const wrapMath = (content) => {
  // Render all math and apply click wrapper.
  MathJax.Hub.getAllJax(content).forEach(math => {
    let equation = content.querySelector(`#${math.inputID}-Frame`);
    // Detect Block equations.
    if (equation.parentNode.classList.contains("MJXc-display")) equation = equation.parentNode;
    // MathJax generate 3 nodes per equation -> wrap them all in one OR skip if already exists.
    if (!equation.parentNode.matches("span.jax-math")) {
      const wrapper = wrapp.elements([equation.previousSibling, equation, equation.nextSibling], "span");
      wrapper.className = "jax-math";
      wrapper.dataset.type = "math";
      wrapper.dataset.mathId = math.inputID;
      wrapper.setAttribute("contenteditable", false);
    }
  });
  return content;
};

/**
 * Get TeX annotation from MathJax Node.
 * @param  {MathJaxNode} math Node containing math.
 * @return {String}           LaTeX Formula.
 */
export const getTexAnnotation = math => {
  if (!math) return ""
  const annotation = math.querySelector("annotation")
  return annotation ? annotation.textContent.trim() : ""
}

/**
 * Add TeX annotations to the element containing math.
 * @param {HTMLElement}  element Element containing <math> node.
 * @param {String}       latex   LaTeX formula to annotate with.
 * @return {HTMLElement}         Reference to the received element with added annotation.
 */

const addTexAnnotation = (element, latex) => {
  const needMrowWrapper = element.firstElementChild.children.length > 1;
  if (needMrowWrapper) wrapp.elements(Array.from(element.firstElementChild.children), "mrow");

  const semantics = wrapp.elements(Array.from(element.firstElementChild.children), "semantics");
  const annotation = document.createElement("annotation");
  annotation.setAttribute("encoding","application/x-tex");
  annotation.textContent = latex;
  semantics.appendChild(annotation);

  return element;
}

/**
 * Update MathJax inside given HTMLElement with new MML.
 * @param  {HTMLElement}  element Reference to the element that need to be updated.
 * @param  {String}       mml     New MathML content.
 * @param  {String}       latex   LaTeX formula to annotate with.
 * @return {Promise}              Promise that is resolved with new MML content as string.
 */

export const updateMath = (element, mml, latex) => new Promise(resolve => {
  element.innerHTML = mml;
  latex && !mml.includes("<semantics>") && addTexAnnotation(element, latex);
  MathJax.Hub.Queue(["Typeset", MathJax.Hub, element, () => {
    element.dataset.mathId = element.querySelector("script").id;
    resolve(mml);
  }]);
});


/**
 * Render MML markup in gien container.
 * @param  {HTMLElement} container DOM node thet contains math to render.
 * @return {Promise}               Promise resolves when math is ready.
 */
export const renderMath = container => new Promise((resolve) =>
  MathJax.Hub.Queue(["Typeset", MathJax.Hub, container, () => resolve(container)])
);


/**
 * Create hidden node in "document.body" to render math in it and return rendered math within the node.
 * @return {Function} New function that returns Promise which tahes LaTeX formula and is resolved when
 *                    the MathJax is ready and math is rendered.
 */
export const latexToMML = () => {
  const buffer = document.createElement("span");
  buffer.style.position = "absolute";
  buffer.style.left = "-9999px";
  buffer.innerHTML = "$x$";
  document.body.appendChild(buffer);

  return (latex) => new Promise((resolve) => {
    buffer.innerHTML = `$${latex}$`;
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, buffer, resolve.bind(this, buffer)]);
  });
};
