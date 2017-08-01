export default (function wrapp() {

  /**
   * Pull out all nodes 'from' given element.
   * @param  {HTMLElement} from Element containing nodes to be extrated.
   * @return {Undefined}
   */
  const getNodesOut = (from) => {
    if (from.childNodes.length === 0) return from.parentNode.removeChild(from);
    from.parentNode.insertBefore(from.firstChild, from);
    getNodesOut(from);
  };



  /**
   *  Wrap 'elements' with HTMLElement of given 'type' with provided 'attrs'.
   *  EXAMPLE: wrapp.elements(node, 'del', { "data-skip-merge" : true });
   * @param  {Array|HTMLElement} els   List or element to wrap.
   * @param  {String}            type  Type of wrapper element.
   * @param  {Object}            attrs Object with attributes for the wrapper.
   * @return {HTMLElement}             Referecne to the wrapper element.
   */
  const elements = (els, type, attrs) => {
    if (!Array.isArray(els)) els = [els];
    const parent = els[0].parentNode;
    if (parent) {
      const wrapper = document.createElement(type);
      parent.insertBefore(wrapper, els[0]);
      els.forEach(node => wrapper.appendChild(node));
      attrs && Object.keys(attrs).forEach(name => wrapper.setAttribute(name, attrs[name]));
      return wrapper;
    }
  };



  /**
   * Wraps selection with element or place element if selection length is 0.
   * @param  {HTMLElement|String} element HTMLElement that will be inserted of wrapped aroud the selection.
   *                                      If element is string then create elemenet if type provided in string.
   * @param  {Object}             attrs   Object with element's attributes (can be also applied to the HTMLElement).
   * @return {HTMLElement}                Referecn to created wrapper element.
   */
  const selection = (element, attrs) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();

    if (typeof element === 'string') element = document.createElement(element);

    attrs && Object.keys(attrs).forEach(name => {
      name === 'content'
        ? element.innerHTML = attrs[name]
        : element.setAttribute(name, attrs[name]);
    });

    selectedText.length === 0
      ? range.insertNode(element)
      : element.childNodes.length > 0
        // Replace selection with complex node
        ? (range.deleteContents(), range.insertNode(element))
        // Wrap selection with simple node.
        : range.surroundContents(element);

    return element;
  };



  /**
   * Remove wrapper el. from the given element or if element is not provided
   * remove wrapper el. from the element containing caret.
   * @param  {HTMLElement|Undefined} element Element that need to be unwrpped.
   * @param  {String}                stopAt  Selector that can't be unwrapped.
   * @return {Undefined}
   */
   const remove = (element, stopAt) => {
     if (typeof element === 'string') {
       stopAt = element;
       element = false;
     }
     const selection = window.getSelection();
     const anchor = element ? element.firstChild : selection.anchorNode;
     if (anchor && (!stopAt ? true : !anchor.parentNode.matches(stopAt))) getNodesOut(anchor.parentNode);
   };



   /**
    * Wrapp selection with wrappers separateb by *.
    * EXAMPLE: wrapp.withText('[*]');
    * @param  {String}     template String ccontaining wrapper elements separated by *.
    * @return {Undefined}
    */
   const withText = (template) => {
     const wraps = template.split('*');
     const selection = window.getSelection();
     const range = selection.getRangeAt(0);
     const selectedText = range.toString();
     document.execCommand("insertHTML", false, wraps[0] + selectedText + wraps[1]);
     if (selectedText.length === 0) selection.modify('move', 'backward', 'character');
   };



  return { elements, selection, withText, remove };
}());
