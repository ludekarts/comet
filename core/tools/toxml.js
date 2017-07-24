const toCnxml = function(uid, copyAttrs, createElement, moveNodes) {

  // ---- Helpers ----------------

  // Find all Bridge-MathJax elements and extract MATHML markup.
  const cleanMath = (source) => {
    Array.from(source.querySelectorAll('span.flux-math')).forEach(element => {
      const parent = element.parentNode;
      parent.insertBefore(document.createRange().createContextualFragment(element.querySelector('script').textContent), element);
      parent.removeChild(element);
    });
    return source;
  };


  // Create new 'x-tag' element from the Editable element.
  const cloneXElement = (clone, node) => {

    // Copy text node.
    if (node.nodeType === 3)
      return clone.appendChild(document.createTextNode(node.textContent));

    const newChild = node.nodeType !== 3
      ? node.dataset && node.dataset.type ? createElement('x-' + node.dataset.type) : node.cloneNode(true)
      : document.createTextNode(node.textContent);

    // Copy attrinytes, excluding 'data-type'.
    Array.from(node.attributes|| []).forEach(attr => attr.name !== 'data-type' && newChild.setAttribute(attr.name, attr.value));

    // Appned x-tag.
    clone.appendChild(newChild);
  };

  // Walk through the tree & create 'x-tags' structure, that can be easily trensforemd into CNXML.
  const xClone = (node, clone) => {
    Array.from(node.childNodes).forEach((child, index) => {
      if (!clone.childNodes[index]) cloneXElement(clone, child);
      if (child.firstChild) xClone(child, clone.childNodes[index]);
    });
    return clone;
  };

  // ---- Transformations ----------------

  // Chenge <reference>s into <link> elements.
  const transformRefs = (node) => {
    const link = createElement('link', node.innerHTML !== 'REFERENCE' ? node.innerHTML : '');
    copyAttrs(node, link);
    node.parentNode.replaceChild(link, node);
  };

  // Add namespace for math elements.
  const transformMath = (node) =>
    node.outerHTML = node.outerHTML.replace(/(<m|<\/m)/g, (match) => match === '<m' ? '<m:m' : '</m:m');

  // Do not allow for line breake.
  const removeNewLines = (node) => node.parentNode.removeChild(node);

  // Transform <i> & <b> tags from Chrome.
  const transformEmphasis = (node) => {
    if (node.matches('i'))
      node.outerHTML = `<emphasis effect="italics">${node.innerHTML}</emphasis>`;
    else if (node.matches('b'))
      node.outerHTML = `<emphasis effect="bold">${node.innerHTML}</emphasis>`;
  };

  // Ensuea all ids are unique
  const transformUniqueIds = (collection = []) => (node) => {
    if (!~collection.indexOf(node.id)) collection.push(node.id) ;
    else {
      const newId = uid();
      node.id = newId;
      collection.push(newId);
    }
  };

  // Trabsform HTML table into CNXML table.
  const transformTables = (table) => {

    const cols = table.getAttribute('cols');
    const title = table.getAttribute('title');

    table.appendChild(moveNodes(table, createElement(`tgroup[cols="${cols}"]`)));
    table.removeAttribute('cols');

    if (title) {
      table.insertBefore(createElement('title', title), table.firstChild);
      table.removeAttribute('title');
    }

    table.outerHTML = table.outerHTML
      .replace(/tr>/g, 'row>')
      .replace(/td>/g, 'entry>')
      .replace(/<td\/>/g, '<entry/>')
  };

  return {
    cleanMath,
    // Convert 'source' HTML tree into CNXML string.
    transform (htmlNode) {

      // Check for duplicate IDs.
      Array.from(htmlNode.querySelectorAll('*[id]')).forEach(transformUniqueIds([]));

      // Clone source HTML node.
      const sourceClone = cleanMath(htmlNode.cloneNode(true));

      // Transform new line.
      Array.from(sourceClone.querySelectorAll('br')).forEach(removeNewLines);

      // Create x-tag equivalents of CNXML. This will make easier
      // to translate CNXML elements that aren't compatible with HTML5
      const xml = xClone(sourceClone, createElement('x-content')).outerHTML
        // Remove 'x-' prefix at the end.
        .replace(/<x-|<\/x-/g, (x) => ~x.indexOf('<\/') ? '</' : '<')
        // Close <img> tags.
        .replace(/<img(.*?)>/g, (a, attrs) => `<image${attrs}/>`)
        // Remove all non-breaking sapces.
        .replace(/&nbsp;/g, ' ');

      // Instantiate XML barser & serializer.
      const parser = new DOMParser();
      const serializer = new XMLSerializer();
      const cnxml = parser.parseFromString(xml, "application/xml");

      // Transform back some of the xml tags to be compatible with CNXML standard.
      Array.from(cnxml.querySelectorAll('reference')).forEach(transformRefs);
      Array.from(cnxml.querySelectorAll('b, i')).forEach(transformEmphasis);
      Array.from(cnxml.querySelectorAll('table')).forEach(transformTables);
      Array.from(cnxml.querySelectorAll('math')).forEach(transformMath);

      // Return final CNXML.
      return serializer.serializeToString(cnxml)
        // Remove unecesery xml namesapces form CNXML elements -> Leftovers from parsing & editing.
        .replace(/xmlns="http:\/\/www\.w3\.org\/1999\/xhtml"/g, '')
        // Remove MathML namespace -> from MatJax math updates.
        .replace(/\s*xmlns="http:\/\/www.w3.org\/1998\/Math\/MathML"/g, '')
        // Remove all spaces between tags.
        .replace(/>\s*?</g, '><')
        // Remove all multiple spaces.
        .replace(/\s{2,}/g, ' ');
    }
  };
};
