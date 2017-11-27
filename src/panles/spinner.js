import {template} from "../tools/travrs";

const scaffold = `
  div.spinner
    div.center
      div.bars
        span.bar.one
        span.bar.two
        span.bar.three
        span.bar.four
        span.bar.five
      div.msg > "Rendering Math..."
`;

export default (root) => {
  let onMathWrappCallback, wrappers;
  const element = template(scaffold);
  root.appendChild(element);
  const toggle = () => element.classList.toggle('show');
  return {toggle}
};
