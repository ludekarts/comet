import {createElement, template} from "../tools/travrs";

// ---- UI elements ----------------

export const refs = {
  render: createElement('div.render'),
  messages: createElement('ul.messages'),
  controls: createElement('div.controls'),
  suggestions: createElement('ul.suggestions'),
  usejax: createElement('input[type="checkbox"]'),
  input: createElement('input.latex[type="text"]'),
  useblock: createElement('input[type="checkbox"]'),
};

const scaffold = `
  div
    @render
    div.input
      @input
    @controls
      span.tex-switch
        span > "MathJax"
        label.switch
          @usejax
          span.slider
      span.tex-switch
        span > "Block"
        label.switch
          @useblock
          span.slider
      button.flat.render[data-action="render"] > "Render"
      button.flat.apply[data-action="apply"] > "Apply"
    @messages
    @suggestions
`;

export const letexUI = template(refs, scaffold);

export const newMessage = ({line, column, message}) => template(`
  li >
    span.cl[title="line:column"] > "${line}:${column}"
    span > "${message}"`
);
