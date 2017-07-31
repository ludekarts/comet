import wrapp from "./wrapp";

/**
 * Wrap MathJax equations in clickable wrapper.
 * @param  {HTMLElement} content Element contining equations.
 * @return {HTMLElement}         Reference to content.
 */
export const wrapMath = (content) => {
  // Render all math and apply click wrapper.
  MathJax.Hub.getAllJax(content).forEach(math => {
    const equation = content.querySelector(`#${math.inputID}-Frame`);
    // MathJax generate 3 nodes per equation -> wrap them all in one OR skip if already exists.
    if (!equation.parentNode.matches('span.jax-math')) {
      const wrapper = wrapp.elements([equation.previousSibling, equation, equation.nextSibling], 'span');
      wrapper.className = 'jax-math';
      wrapper.dataset.type = 'math';
      wrapper.dataset.mathId = math.inputID;
      wrapper.setAttribute('contenteditable', false);
    }
  });
  return content;
};


/**
 * Renders given LaTeX formula to the buffer node.
 * @param  {String}       latex LaTeX formula that need to be render.
 * @return {HTMLElement}        Element with new MathJax nodes.
 */
export const singleMathRender = (latex) => {
  const nodeBuffer = document.createElement('span');
  nodeBuffer.innerHTML = `$${latex}$`;
  MathJax.Hub.Queue(["Typeset", MathJax.Hub, nodeBuffer]);
  return nodeBuffer;
};


/**
 * Renders given LaTeX formula to the buffer node & returns promise.
 * @param  {String}       latex LaTeX formula that need to be render.
 * @return {Promise}            Promise with new MathJax element.
 */
export const singleMathPromise = (latex) => new Promise((resolve) => {
  const nodeBuffer = document.createElement('span');
  nodeBuffer.innerHTML = `$${latex}$`;
  MathJax.Hub.Queue(["Typeset", MathJax.Hub, nodeBuffer, resolve.bind(this, nodeBuffer)]);
});


/**
 * Update MathJax in given element with new LaTeX formula.
 * @param  {String}       latex LaTeX formula for update.
 * @param  {HTMLElement}  element Reference to the element that need to be updated.
 * @return {Undefined}
 */
export const updateMath = (latex, element) => {
  const MathMl = MathJax.Hub.getAllJax(element)[0];  
  if (MathMl.inputJax === 'MathML') {
    const NewJax = MathJax.Hub.getAllJax(singleMathRender(latex))[0];
    NewJax && MathMl && MathMl.Text(NewJax.root.toMathML());
  }
  else MathMl.Text(latex);
  return element;
};


/**
 * Run MathJax render.
 * @param  {Function} callback Function that will be called after math is rendered.
 * @return {Undefined}
 */
const reRenderMath = (callback) =>
  MathJax.Hub.Queue(["Typeset", MathJax.Hub, callback]);
