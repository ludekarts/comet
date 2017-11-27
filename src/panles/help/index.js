import scrollbar from "perfect-scrollbar";
import {createElement, template} from "../../tools/travrs";
import {manualPage, attributionPage, aboutPage} from "./pages";

const scaffold = `
  div.help
    @content::div.content
    div.footer
      button.prev[data-action="manual"] > "Manual"
      button.prev[data-action="about"] > "About"
      button.next[data-action="attribs"] > "Attribution"
`;


export default (root) => {

  const [element, refs] = template(scaffold);
  const about = template(aboutPage);
  const manual = template(manualPage);
  const attribs = template(attributionPage);
  root.appendChild(element);

  scrollbar.initialize(refs.content, {maxScrollbarLength: 90});

  const showPage = (page) => {
    refs.content.scrollTop = 0;
    const oldContent = refs.content.querySelector('div.manual');
    if (oldContent) refs.content.removeChild(oldContent);
    refs.content.appendChild(page);
  }

  const detectAction = ({target}) => {
    const action = target.dataset.action;
    if (!action) return;

    switch (action) {
      case 'manual':
        return showPage(manual);
      case 'about':
        return showPage(about);
      case 'attribs':
        return showPage(attribs);
    }
  };

  // Set Page One.
  showPage(manual);

  // Listeners.
  element.addEventListener('click', detectAction);

  // API Methods.
  const toggle = () => element.classList.toggle('show');

  return {toggle}
};
