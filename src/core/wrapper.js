import wrapp from "../tools/wrapp";
import {template, createElement} from "../tools/travrs";


const scaffold = `
  div.nodeWrapper >
    @input
`;

export default (function Wrapper () {

  let currentTarget;
  const refs = { input: createElement('input') };
  const element = template(refs, scaffold);

  const show = ({target}) => {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    if (!target.closest('#editor') && selectedText.length === 0) return;
    if (/\s/.test(selectedText.slice(-1))) selection.modify("extend", "backward", "character");
    currentTarget = wrapp.selection('wrapp');
    element.classList.add('show');
    refs.input.focus();
  }

  const hide = () => {
    if (currentTarget && currentTarget.matches('wrapp')) wrapp.remove(currentTarget);
    element.classList.remove('show');
  }

  const confirm = ({keyCode}) => {
    if (keyCode === 13) {
      const range = new Range();
      range.selectNodeContents(currentTarget);
      range.surroundContents(createElement(refs.input.value));
      wrapp.remove(currentTarget);
      hide();
    }
  }
  refs.input.addEventListener('keydown', confirm);

  return { element, show, hide }
}());
