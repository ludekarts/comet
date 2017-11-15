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
 * Update MathJax inside given HTMLElement with new MML.
 * @param  {String}       mml new MathML content.
 * @param  {HTMLElement}  element Reference to the element that need to be updated.
 * @return {Promise}
 */

export const updateMath = (element, mml) => new Promise((resolve) => {
  element.innerHTML = mml;
  MathJax.Hub.Queue(["Typeset", MathJax.Hub, element, () => {
    element.dataset.mathId = element.querySelector('script').id;
    resolve(mml);
  }]);
});


/**
 * Run MathJax render.
 * @param  {HTMLElement} container DOM node thet contains math to render.
 * @return {Promise}     Promise resolves when math is ready.
 */
export const renderMath = (container) => new Promise((resolve) =>
  MathJax.Hub.Queue(["Typeset", MathJax.Hub, container, resolve]));


/**
 * Create hidden node in document.body to render math in it and returns
 * rendered math with the node.
 * @return {Function} New functin that returns Promise which is reday when
 *                    the LaTeX formula is ready.
 */
export const latexToMML = () => {
  const buffer = document.createElement('span');
  buffer.style.position = "absolute";
  buffer.style.left = "-9999px";
  buffer.innerHTML = '$x$';
  document.body.appendChild(buffer);
  return (latex) => new Promise((resolve) => {
    buffer.innerHTML = `$${latex}$`;
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, buffer, resolve.bind(this, buffer)]);
  });
};
