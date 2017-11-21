// Transfrom array of objects in to JS object,
// stores each entry under the key pulled from the object.
export const arrayToObject = (array, key) =>
  array.reduce((result, object) => {
    result[object[key]] = object;
    return result;
  }, {});


// Split string at index. -> splitAt(5)('HelloWord')
export const splitAt = index => str => [str.slice(0, index), str.slice(index)];


export const palceBetween = (source, value, position) =>
  source.slice(0, position) + value + source.slice(position + value.length - 1, source.length);


// Fortam XML input.
export const formatXml = (xml) => {
  let pad = 0;
  return xml
    .replace(/(>)(<)(\/*)/g, '$1\r\n$2$3')
    .split('\r\n')
    .reduce((result, node) => {
      let indent = 0;
      let padding = '';

      if (node.match(/.+<\/\w[^>]*>$/)) {
        indent = 0;
      } else if (node.match(/^<\/\w/) && pad !== 0) {
        pad--;
      } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
        indent = 1;
      } else {
        indent = 0;
      }

      for (let i = 0; i < pad; i++) padding += '  ';
      pad += indent;
      return result += padding + node + '\r\n';
    }, '')
    // Uncoment to escape angle beackets.
    // .replace(/&/g, '&amp;')
    // .replace(/</g, '&lt;')
    // .replace(/>/g, '&gt;')
    // .replace(/ /g, '&nbsp;');
};


// Create random uid.
export const uid = () =>
  'ked-' + ((+new Date) + Math.random()* 100).toString(32).replace('.', '_');


// Create Element from source string.
export const elFromString = (source) =>
  document.createRange().createContextualFragment(source);


// Move nodes 'from' node 'to' node.
export const moveNodes = (from, to) => {
  while(from.childNodes.length > 0) to.appendChild(from.firstChild);
  return to;
};

// Copy arributes 'from' one element 'to' another.
export const copyAttrs = (from, to, excluded = []) =>
  Array.from(from.attributes || []).forEach(attr => !~excluded.indexOf(attr.name) && to.setAttribute(attr.name, attr.value));


// Encode Base 64
export const base64 = (str) =>
  btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) =>
    String.fromCharCode('0x' + p1)
  ));

// Create hashCode from string.
export const hashCode = (source) =>
  source.split("").reduce((a, b) => { a = (( a << 5) - a) + b.charCodeAt(0); return a&a }, 0);

// Debounce callback fn.
export const debounce = (callback, wait, immediate) => {
	let timeout;
	return (...args) => {
		const later = () => {
			timeout = null;
			if (!immediate) callback.apply(this, args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (immediate && !timeout) callback.apply(this, args);
	};
};


// Debounce callback fn as promise.
export const debouncePromise = (func, wait, immediate) => {
  let timeout;
  return (...args) => {
    const context = this;
    return new Promise((resolve) => {
      const later = () => {
        timeout = null;
        if (!immediate) resolve(func.apply(context, args));
        };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) resolve(func.apply(context, args));
      }
    );
  };
};


// Call callback function on firt call & wait for given amount of time, to callit again.
export const pause = (callback, wait) => {
  let timeout, block = false;
  return (...args) => {
    if (!block) {
      clearTimeout(timeout);
      callback.apply(this, args);
      block = true;
      timeout = setTimeout(() => block = false, wait);
    }
  };
};


// Call callback function if it is called within delta time range.
export const inDeltaTime = (callback, delta) => {
  let startTime, currentTime = 0;
  return (...args) => {
    startTime = new Date();
    if (startTime - currentTime <= delta) {
      callback.apply(this, args);
      startTime = 0;
    }
    currentTime = startTime;
  }
};


// Create a looping stack.
export const loopstack = (length, counter = 0) => {
  const stack = new Array(length);
  let head = '';
  return {
    push (item) {
      if (!item) return;
      stack[counter] = item;
      counter = (counter === length - 1) ? 0 : (counter += 1);
      // console.log(stack); // Debug.
    },
    pull (def) {
      counter = (counter === 0) ? length - 1 : (counter -= 1);
      head = stack[counter];
      stack[counter] = undefined;
      return head || def;
    }
  }
};


// Helper for copying text to clipboard.
export const clipboard = (root) => {
  const clipInput = root.querySelector('#clipInput') || document.createElement('input');
  if (!clipInput.id) {
    clipInput.id = '#clipInput';
    clipInput.style.opacity = 0;
    clipInput.style.zIndex = -10;
    clipInput.style.left= '-9999px';
    clipInput.style.position= 'fixed';
    root.appendChild(clipInput);
  }
  return (value) => {
    clipInput.value = value;
    clipInput.select();
    document.execCommand('copy');
    console.log('Copied: ' + value);
  }
};

// Fuzzy search inplementation.
export const fuzzysearch = (chars, stack) => {
  let slen = stack.length;
  let clen = chars.length;
  if (clen > slen) return false;
  if (clen === slen) return chars === stack;

  outer: for (let i = 0, j = 0; i < clen; i++) {
    let sch = chars.charCodeAt(i);
    while (j < slen) {
      if (stack.charCodeAt(j++) === sch) {
        continue outer;
      }
    }
    return false;
  }
  return true;
};


// Modifier function with memory.
export const Memo = (modifier, previous) => {
  if (typeof modifier !== 'function') throw "Modifier need to be a function.";
  return (current) => {
    //NOTE: To memoize previous value you need to return it from the 'modifier'.
    previous = modifier(current, previous);
    return previous;
  }
};

// Collect all parentNode elments begin from given 'node' and end on 'div[content=true]'
export const getPath = (node, path = [node]) => {
  if (!node.parentNode.matches('div[content=true]')) {
    path.push(node.parentNode);
    return getPath(node.parentNode, path)
  }
  return path;
};


export const getNodesOut = (from) => {
  if (from.childNodes.length === 0) return from.parentNode.removeChild(from);
  from.parentNode.insertBefore(from.firstChild, from);
  getNodesOut(from);
};
