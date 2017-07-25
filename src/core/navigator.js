export default function Navigator (selector) {
  let end, current, equations = [];
  let pointer = -1;

  const clear = () => {
    equations.forEach(eq => eq = null);
    equations = [];
  };

  const next = () => {
    if (current) current.classList.remove('active');
    pointer = pointer === end ? 0 : pointer + 1;
    current = equations[pointer];
    current.classList.add('active');
    return current;
  };

  const prev = () => {
    if (current) current.classList.remove('active');
    pointer = pointer < 0 ? end : pointer - 1;
    current = equations[pointer];
    current.classList.add('active');
    return current;
  };

  const update = (latex) => {
    let found;
    const id = current.dataset.mathId;
    const nodeBuffer = document.createElement('span');
    nodeBuffer.innerHTML = `$ ${latex} $`;
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, nodeBuffer]);
    const MJNodes = MathJax.Hub.getAllJax(nodeBuffer);
    if (MJNodes.length > 0 && MathJax.Hub.getAllJax('#preview').some(math => (math.inputID === id && (found = math))))
      found.Text(MJNodes[0].root.toMathML());
  };

  const add = (latex) => {
    console.log('add', latex);
  };

  const set = (element) => {
    const index = equations.indexOf(element);
    if (~index) {
      pointer = index - 1;
      next();
    }
  };

  const select = (selector) => {
    clear();
    equations = Array.from(document.querySelectorAll(selector));
    end = equations.length - 1;
  };

  return {select, add, set, next, prev, update};
};
