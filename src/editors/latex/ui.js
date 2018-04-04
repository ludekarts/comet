import {template} from "../../tools/travrs";

// ---- UI elements ----------------

const scaffold = `
  div
    @render::div.render
    div.input
      @input::input.latex[type="text"]
    @controls::div.controls
      span.tex-switch
        span > "MathJax"
        label.switch
          @usejax::input[type="checkbox"]
          span.slider
      span.tex-switch
        span > "Block"
        label.switch
          @useblock::input[type="checkbox"]
          span.slider
      span.tex-switch
        span > "Update similar"
        label.switch
          @similar::input[type="checkbox"]
          span.slider
      button.render[title="Ctrl + Enter" data-action="render"] > "Render"
      button.apply[title="Shift + Enter"data-action="apply"] > "Apply"
    @messages::ul.messages
    @suggestions::ul.suggestions
`;

const [element, references] = template(scaffold);

export const refs = references;
export const letexUI = element;

export const newMessage = ({line, column, message}) => template(`
  li >
    span.cl[title="line:column"] > "${(line && column) ? (line +':'+ column) : ''} "
    span > "${message}"`
);
