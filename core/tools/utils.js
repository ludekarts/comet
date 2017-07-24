const utils = (function(travrs, toCnxml) {

  const {createElement, template} = travrs;

  const arrayToObject = (array, key) =>
    array.reduce((result, object) => {
      result[object[key]] = object;
      return result;
    }, {});


  // Fortam XML input.
  const formatXml = (xml) => {
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

  const uid = () =>
    'ked-' + ((+new Date) + Math.random()* 100).toString(32).replace('.', '_');

  const elFromString = (source) =>
    document.createRange().createContextualFragment(source);


  const getNodesOut = (current) => {
    const parent = current.parentNode;
    let next, node = current.firstChild;
    while (node) {
      next = node.nextSibling;
      parent.insertBefore(node, current);
      node = next;
    }
    parent.removeChild(current);
  };

  // Unwrap elements that have carret on it
  const unwrapElement = (stopAt) => {
    const selection = window.getSelection();
    const anchor = selection.anchorNode;
    if (anchor && !anchor.parentNode.matches(stopAt)) getNodesOut(anchor.parentNode);
  };

  // Insert 'node' as a sibling of 'target' node if target is an ElementChild.
  // If target is a test node add sibling to its parent.
  const insertSiblingNode = (target, node) => {
    const current = target.nodeType === 3 ? target.parentNode : target;
    const parent = current.parentNode;
    parent.lastElementChild === current ? parent.appendChild(node) : parent.insertBefore(node, current.nextSibling);
  };

  // Move element which has active selection on level up in DOM tree.
  const moveElement = (stopAt, moveUp = true) => {
    const selection = window.getSelection();
    if (!selection.anchorNode) return false;

    const current = selection.anchorNode.nodeType === 3
      ? selection.anchorNode.parentNode
      : selection.anchorNode;

    const parent = current.parentNode;
    if (parent.parentNode && !parent.matches(stopAt)) {
      moveUp
        ? parent.parentNode.insertBefore(current, parent)
        : parent.nextElementSibling
          ? parent.parentNode.insertBefore(current, parent.nextElementSibling)
          : parent.parentNode.appendChild(current)

      // Put carret at the begining.
      const range = document.createRange();
      range.setStart(current.firstChild, 0);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    return false;
  };

  // Move nodes 'from' node 'to' node.
  const moveNodes = (from, to) => {
    while(from.childNodes.length > 0) to.appendChild(from.firstChild);
    return to;
  };

  // Set caret at the end og given element.
  const setCaret = (element) => {
    const selection = window.getSelection();
    const range = document.createRange();
    if (!element.lastChild) return;
    try {
      range.setStart(element.lastChild, element.lastChild.textContent.length);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    } catch (e) {
      // TODO: handle this better.
    }
  };

  // Wrap 'elements' with HTMLElement of given 'type' with provided 'attrs'.
  // EXAMPLE: wrapElement(node, 'del', { "data-skip-merge" : true });
  const wrapElement = (elements, type, attrs) => {
    if (!Array.isArray(elements)) elements = [elements];
    const parent = elements[0].parentNode;

    if (parent) {
      const wrapper = document.createElement(type);
      parent.insertBefore(wrapper, elements[0]);
      elements.forEach(node => wrapper.appendChild(node));
      attrs && Object.keys(attrs).forEach(name => wrapper.setAttribute(name, attrs[name]));
      return wrapper;
    }
  };

  // Pares Equations.
  const wrapMath = (content) => () => {
    // Render all math and apply click wrapper.
    MathJax.Hub.getAllJax(content).forEach(math => {
      const equation = document.getElementById(`${math.inputID}-Frame`);
      // MathJax generate 3 nodes per equation -> wrap them all in one.
      if (!equation.parentNode.matches('span.flux-math')) {
        const wrapper = wrapElement([equation.previousSibling, equation, equation.nextSibling], 'span');
        wrapper.className = 'flux-math';
        wrapper.dataset.type = 'math';
        wrapper.dataset.mathId = math.inputID;
        wrapper.setAttribute('contenteditable', false);
      }
    });
  };

  // Update Jax with given @id with new @latex formula.
  const updateMath = (id, latex) => {
    let found;
    const nodeBuffer = document.createElement('span');
    nodeBuffer.innerHTML = `$ ${latex} $`;
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, nodeBuffer]);
    const MJNodes = MathJax.Hub.getAllJax(nodeBuffer);
    if (MJNodes.length > 0 && MathJax.Hub.getAllJax('#content').some(math => (math.inputID === id && (found = math))))
      found.Text(MJNodes[0].root.toMathML());
  };

  // Copy arributes 'from' one element 'to' another.
  const copyAttrs = (from, to, excluded) =>
    Array.from(from.attributes || []).forEach(attr => !~excluded.indexOf(attr) && to.setAttribute(attr.name, attr.value));

  // Encode Base 64
  const base64 = (str) =>
    btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) =>
      String.fromCharCode('0x' + p1)
    ));

  // Debounce callback fn.
  const debounce = (callback, wait, immediate) => {
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

  // Call callback function on firt call & wait for given amount of time, to callit again.
  const pause = (callback, wait) => {
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

  // Create a looping stack.
  const loopstack = (length, counter = 0) => {
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

  const clipboard = (root) => {
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

  const fuzzysearch = (needle, haystack) => {
    var hlen = haystack.length;
    var nlen = needle.length;
    if (nlen > hlen) {
      return false;
    }
    if (nlen === hlen) {
      return needle === haystack;
    }

    outer: for (var i = 0, j = 0; i < nlen; i++) {
      var nch = needle.charCodeAt(i);
      while (j < hlen) {
        if (haystack.charCodeAt(j++) === nch) {
          continue outer;
        }
      }
      return false;
    }
    return true;
  };

  // To CNXML module.
  // const toCNXML = toCnxml(uid, copyAttrs, createElement, moveNodes);

  return {
    uid,
    pause,
    base64,
    template,
    debounce,
    wrapMath,
    setCaret,
    loopstack,
    formatXml,
    copyAttrs,
    clipboard,
    moveNodes,
    updateMath,
    wrapElement,
    moveElement,
    fuzzysearch,
    elFromString,
    createElement,
    arrayToObject,
    unwrapElement,
    insertSiblingNode,
    // toCnxml: toCNXML.transform,
    // cleanMath: toCNXML.cleanMath

  };
}(travrs));
