const headers = new Headers();

// Use Version 1 of tex2mml (with SiUnitX).
headers.set('X-Request-Version', 1);

const fetchConfig = (body) => ({
  headers,
  body: body,
  mode: 'cors',
  method: 'post',
  cache: 'default'
});

export default function connect (latex, isBlock = false) {
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
