const headers = new Headers();

const fetchConfig = (body) => ({
  headers,
  mode: 'cors',
  method: 'post',
  cache: 'default',
  body: '\\usepackage{math} \\begin{document} \\begin{math} ' + body + ' \\end{math} \\end{document} '
});

export default function send (latex, isBlock = false) {
  headers.has("x-display")
    ? headers.set("x-display", isBlock ? "block" : "inline")
    : headers.append("x-display", isBlock ? "block" : "inline");
  return fetch('http://tex2mml.naukosfera.com', fetchConfig(latex))
    .then(response => {
      return ~response.headers.get("content-type").indexOf('application/json')
        ? response.json()
        : {
            result: "<math><mo>⚔</mo></math>",
            messages: [{message: "Cannot render this equation. Try to use MathJax render."}]
          }
    })
    .catch(error => {
      return {
        result: "<math><mo>⚞o⚟</mo></math>",
        messages: [{message: "Connection error"}]
      }
    });
};