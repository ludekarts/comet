
// travrs.js v 0.1.2
//
// An utility to help create DOM structure/elements from 'templateString'.
// by Wojciech Ludwin 2017, ludekarts@gmail.com

// USAGE:
// const div = createElement('div#identity.classOne.classTwo[title="My Title" data-hello="world"]', 'This is DIV');

// NESTING:
// Travrs uses nesting to detect DOM structure, so keep your sibling nodes aligned ;)

// REFERENCES:
// Using @referenceName you can plug existing nodes into template. Pass them as 'refs' object - first, optional param
// in template(refs, templateString) function.
// e.g:
// const refs = { referenceName: createElement('div', 'hello') }


const travrs = (function() {
  
 const createElement = (phrase, content) => {
  // Filter attributes.
  let attrs = phrase.match(/[\w-]+=".+?"/g);
  if (attrs) attrs = attrs.map(match => match.replace(/"/g,'').split('='));

  // Filter id, type & classes.
  const head = ~phrase.indexOf('[') ? phrase.slice(0, phrase.indexOf('[')) : phrase;
  let id, classes = ~head.indexOf('.') ? head.split('.') : [head], type = classes[0];

  // Separate classes.
  if (classes.length > 0)
    classes = classes.slice(1, classes.length).join(' ');

  if (~type.indexOf('#')) [type, id] = type.split("#");

  // Create element.
  const element = document.createElement(type);

  // Append id.
  if (id) element.id = id;

  // Append content.
  if (content) {
    if (typeof content === 'string') {
      element.innerHTML = content ;
    }
    else if (content instanceof HTMLElement) {
      element.appendChild(content);
    }
  }

  // Append attributes.
  if (attrs) attrs.forEach(attribute => element.setAttribute(attribute[0], attribute[1]));
  // Append classes.
  if (classes) element.className = classes;

  return element;
};


const pipeElement = (element, content) => {
  if (content) {
    if (typeof content === 'string') {
      element.innerHTML = content ;
    }
    else if (content instanceof HTMLElement) {
      element.appendChild(content);
    }
  }
  return element;
}

const getIndex = (str) => {
  const match = str.match(/^\s+/);
  return match ? match[0].length/2 : 0;
};

const parentIndex = (array, index, id) => {
  for (let i = index; i >= 0; i--) {
    if (getIndex(array[i]) < id) {
      return i;
    }
  }
  return -1;
};

const create = (id, refs) => {
  id = id.trim();
  const parentMarker = id.indexOf('>');
  const reference = id.match(/@([\w-_\.]+)/);
  const type = (parentMarker > -1) ? id.slice(0, parentMarker) : id;
  const textContent = id.match(/> "(.+)"/);
  const refElement = reference && refs ? refs[reference[1]] : undefined;

  return refElement ?
    pipeElement(refElement, textContent ? textContent[1] : undefined):
    createElement(type.trim(), textContent ? textContent[1] : undefined);
};

const travrs = (array, refs) => {
  const wrapper = create('root');
  array.map((el, index) => {
    return {
      id: index,
      type: el.trim(),
      parent: parentIndex(array, index-1, getIndex(el)),
      element: create(el, refs)
    }
  })
  .forEach((node, index, array) =>
    (node.parent === -1) ? wrapper.appendChild(node.element) : array[node.parent].element.appendChild(node.element)
  );
  return wrapper.firstChild;
};

const template = (refs, templateStr) => {
  // Male 'refs' optional.
  if (typeof refs === 'string') templateStr = refs;
  const array = templateStr.trim().split('\n');
  return travrs(array, refs);
};

  return {template, createElement};
}());
