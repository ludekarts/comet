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
  nodeBuffer.textContent = `$${latex}$`;
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
    if (NewJax && MathMl) MathMl.Text(NewJax.root.toMathML());
    else return;
  }
  else MathMl.Text(latex);
  return element;
};

export const updateMath2 = (element, mml) => new Promise((resolve) => {
  element.innerHTML = mml;
  MathJax.Hub.Queue(["Typeset", MathJax.Hub, element, () => {
    element.dataset.mathId = element.querySelector('script').id;
    resolve(mml);
  }]);
});



/**
 * Run MathJax render.
 * @param  {Function} callback Functions that will be called after math is rendered.
 * @return {Undefined}
 */
export const renderMath = (container) => new Promise((resolve) =>
  MathJax.Hub.Queue(["Typeset", MathJax.Hub, container, resolve]));


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
}
