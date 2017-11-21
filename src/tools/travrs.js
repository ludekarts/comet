
// travrs.js v 0.2.1
//
// An utility to help create DOM structure/elements from 'templateString'.
// by Wojciech Ludwin 2017, ludekarts@gmail.com

// USAGE:
// const div = createElement('div#divId.classOne.classTwo[title="My Title" data-hello="world"]', 'This is content');

// REFERENCES:
// Using '@referenceName::' in your templateString you can retrive those 'tagged' nodes from template() function.
// E.G.
// const [element, refs] = template(`
//   div.hello
//     h2 > "Hello Travrs 2!"
//     @subtitle::span > "I'm subtitle with reference."
// `);

export const createElement = (phrase, content) => {
 // Filter attributes.
 let attrs = phrase.match(/[\w-:]+=".+?"/g);
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
 const reference = id.trim().match(/@([\w-_\.]+::)/);
 id = reference ? id.slice(id.indexOf('::') + 2, id.length) : id;
 const parentMarker = id.indexOf('>');
 const type = (parentMarker > -1) ? id.slice(0, parentMarker) : id;
 const textContent = id.match(/> "(.+)"/);
 const element = createElement(type.trim(), textContent ? textContent[1] : undefined);
 reference && (refs[reference[0].slice(1,-2)] = element);
 return element;
};

const travrs = (lines) => {
 const refs = {};
 const wrapper = create('root');
 lines.map((el, index) => ({
     id: index,
     type: el.trim(),
     parent: parentIndex(lines, index-1, getIndex(el)),
     element: create(el, refs)
   }))
 .forEach((node, index, lines) =>
   node.parent === -1
     ? wrapper.appendChild(node.element)
     : lines[node.parent].element.appendChild(node.element)
 );

 return Object.keys(refs).length > 0
   ? [wrapper.firstChild, refs]
   : wrapper.firstChild;
};

export const template = (templateStr) => travrs(templateStr.trim().split('\n'));
