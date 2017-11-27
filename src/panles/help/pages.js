import {template} from "../../tools/travrs";
import cometPackage from "../../../package.json";

export const manualPage = `
  div.manual
    h1 > "User Manual"
    hr
    h2 > "Quick start"
    p > "Comet allows you to open <strong>XML</strong> and <strong>CNXML</strong> files. In order to do that press <code>Ctrl + O</code> on your keyboard, and with the displayed file-picker chose the file you ‘d like to edit. Comet allows you edit only <strong>XML content</strong>, without the initial structure to avoid accidental node remove and error in CNX Legacy system."
    p > "To start edition to click on a text paragraph or inline element (term, link, foreign, etc.). When edition is possible selected paragraph will display yellow bar on its left side."
    p > "If you left empty paragraph it wille be selected with <span class="magenta">magenta</span> background."
    hr
    h2 > "Editors"
    p > "With Comet you can edit MathMl formulas using <strong>LaTeX Editor</strong> and elements' attributes with <strong>Atribute editor</strong>."
    div.space
    h3 > "LaTeX Editor"
    ul.wide
      li > "<code>F2</code> - To open/close the editor."
      li > "To update equation in XML content:"
        ol.wide
          li > "Click on the (<span class="yellow">yellow</span>) equation inside XML content to select it."
          li > "Type proper Tex formula inside LaTeX editor."
          li > "Click <strong>Render</strong> button or press <code>Ctrl + Enter</code> to preview equation."
          li > "Click <strong>Apply</strong> button or press <code>Shift + Enter</code> to replace seleccted equation."
      li > "Above keyboard shortcuts works only if caret is in LaTeX input field."
      li > "By default the editor uses <strong>tex2mml converter</strong> to transform LaTeX formulas into MML equations. If converter fails it will display <code>⚔</code> symbol. In that case try to use error messages to find and fix the equation or as a last resort switch to <strong>MathJax render</strong> with a toggle on the editor panel."
      li > "As a default render style editor will use <strong>inline style</strong>. To change it, switch <strong>block toogle</strong> on the editor panel."
      li > "To use <strong>LaTeX autocomplete</strong> start typing inside LaTeX Editor. By default Comet sill use <strong>fuzzy seach</strong> but if you start typing your phrase with <code>\\</code> symbol it will go for the <strong>exaxt match</strong>. You can use arrows keys to navigate through autocomplete results."
    div.space
    h3 > "Attributes Editor"
    ul.wide
      li > "To open the editor <strong>click on the inline element</strong> like: <strong>terms</strong>, <strong>links</strong>, etc. "
      li > "In order o change content of the element you can modify first input field on the attributes panel."
      li > "To add new attribute put its value into second input box in current form: <code>attribute-name = attribute value</code>, then press <code>+</code> button."
      li > "You can add multiple predefined attributes from <strong>templates</strong> available in Wrappers panel.To do that type inside attribute input box formula <code>@template-name</code>, where <em>template-name</em> is lowercase nameo of one of the wrappers in Wrappers panel e.g.: <strong>@term</strong>."
      li > "To remove attribute press <code>X</code> button next to the attribute label."
      li > "To save change click <strong>Save</strong> button."
      li > "Pressing <strong>Unwrap</strong> button you can remove XML tag arounnd selected node."
    hr
    h2 > "Panels"
    div.space
    h3 > "Wrappers"
    p > "Contains templates of inline elements."
    ul
      li > "<code>Ctrl + W</code> - To open/close panel."
      li > "To use them you need to select text inside XML content and pick one of the wrappers from the list."
    div.space
    h3 > "Equations"
    p > "This panel contains all <strong>unique equations</strong> that was applied into XML content."
    ul
      li > "<code>Ctrl + Space</code> - To open/close panel."
      li > "In order to reuse them you need to:"
        ol.wide
          li > "Place caret inside XML content and press one of the equations insied the panel - this action will place rendered equation inside XML content."
          li > "Place caret inside LaTeX Editor and press one of the equations insied the panel - this action will place rendered equation inside the LaTeX Editor."
      li > "To remove equation from the panel click on it holding <code>Alt</code> key."
    div.space
    h3 > "Output"
    p > "Contains output XML markup, that can be either copied or saved on a hard drive."
    ul
      li > "<code>Ctrl + X</code> - To open/close panel."
      li > "Press <strong>Copy</strong> button to copy into clipboard."
      li > "Press <strong>Save</strong> button to save XML markup as a new file."
    div.space
    h3 > "Search"
    p > "Allows to search words in XML content."
    ul
      li > "<code>F3</code> - To open/close panel."
      li > "To search word type it inside search panel and press <code>Enter</code>."
      li > "To walk through found words, press <code>Tab</code> key."
    hr
    h2 > "Other shortcuts"
    ul.wide
      li > "<code>Tab</code> - Walk through selected elements."
      li > "<code>Esc</code> - Close displayed plane/ deselect."
      li > "<code>Ctrl + Z</code> - Undo previous operation (max 25 operations)."
      li > "<code>Ctrl + H</code> - Show Help panel."
      li > "<code>Ctrl + W</code> - Close application."
`;


export const attributionPage = `
  div.manual
    h1 > "Attribution"
    hr
    p > "Many thanks to people collaborating on projects that supports Comet:"
    ul.wide
      li
        a[href="#"] > "Electron"
        span.subtext > "https://github.com/electron/electron"
      li
        a[href="#"] > "Electron Forge"
        span.subtext > "https://github.com/electron-userland/electron-forge"
      li
        a[href="#"] > "MathJax"
        span.subtext > "https://github.com/mathjax/MathJax"
      li
        a[href="#"] > "Perfect Scrollbar"
        span.subtext > "https://github.com/utatti/perfect-scrollbar"
      li
        a[href="#"] > "Babel Transpiler"
        span.subtext > "https://github.com/babel/babel"
      li >
        a[href="#"] > "Tex2mml"
        span > " converter by "
        a[href="#"] > "@aiwenar"
  `;

export const aboutPage = `
  div.manual
    div.about
      h1 > "Comet v ${cometPackage.version}"
      p > "by Wojciech Ludwin, @ludekarts"
      a[href="#"] > "ludekarts@gmail.com"
`;
