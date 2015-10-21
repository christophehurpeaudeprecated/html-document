import Node from './Node';
import Comment from './Comment';
import DocumentFragment from './DocumentFragment';
import HTMLElement from './HTMLElement';
import Text from './Text';
import Url from './utils/Url';

// HTML Elements
import HTMLOptionElement from './HTMLElement/elements/HTMLOptionElement';
import HTMLSelectElement from './HTMLElement/elements/HTMLSelectElement';
import HTMLTableCaptionElement from './HTMLElement/elements/HTMLTableCaptionElement';
import HTMLMetaElement from './HTMLElement/elements/HTMLMetaElement';
import HTMLTableElement from './HTMLElement/elements/HTMLTableElement';
import HTMLTableRowElement from './HTMLElement/elements/HTMLTableRowElement';
import HTMLTableSectionElement from './HTMLElement/elements/HTMLTableSectionElement';
import HTMLAnchorElement from './HTMLElement/elements/HTMLAnchorElement';

const elementClasses = new Map([
    ['caption', HTMLTableCaptionElement],
    ['meta', HTMLMetaElement],
    ['option', HTMLOptionElement],
    ['table', HTMLTableElement],
    ['thead', HTMLTableSectionElement],
    ['tfoot', HTMLTableSectionElement],
    ['tfoot', HTMLTableSectionElement],
    ['tr', HTMLTableRowElement],
    ['select', HTMLSelectElement],
]);

/**
 * @see https://developer.mozilla.org/en/docs/Web/API/Document
 */
export default class Document extends Node {
    constructor() {
        super();
        /**
         * @type {HTMLElement}
         */
        this.documentElement = this.createElement('html');

        /**
         * @type {HTMLElement}
         */
        this.head = this.createElement('head');
        this.documentElement.appendChild(this.head);

        /**
         * @type {HTMLElement}
         */
        this.body = this.createElement('body');
        this.documentElement.appendChild(this.body);

        this._location = new Url('about:blank');
    }

    /**
     * Creates a new {@link Comment}.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document.createComment
     *
     * @param {string} data
     * @return {Comment}
    */
    createComment(data) {
        let comment = new Comment(data);
        comment._ownerDocument = this;
        return comment;
    }

    /**
     * Creates a new empty {@link DocumentFragment}.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document.createDocumentFragment
     *
     * @return {DocumentFragment}
    */
    createDocumentFragment() {
        let fragment = new DocumentFragment();
        fragment._ownerDocument = this;
        return fragment;
    }

    /**
     * Creates a new element with the given tag name.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document.createElement
     *
     * @param {string} name
     * @return {HTMLElement}
    */
    createElement(name) {
        name = name.toLowerCase();
        const ElementClass = elementClasses.get(name) || HTMLElement;
        let element = new ElementClass();

        element._ownerDocument = this;

        if (!element.nodeName) {
            element.nodeName = name;
        }

        return element;
    }

    /**
     * Creates a text node.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document.createTextNode
     *
     * @param {string} textContent
     * @return {Text}
    */
    createTextNode(textContent) {
        let text = new Text(textContent);
        text._ownerDocument = this;
        return text;
    }

    /**
     * Returns a reference to the element by its ID.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document.getElementById
     *
     * @param {string} id case-sensitive string representing the unique ID of the element being sought
     * @return {Element} reference to an Element, or null if an element with the specified ID is not in the document.
     */
    getElementById(id) {
        return this.documentElement.getElementById(id);
    }

    /**
     * Returns an HTMLCollection of elements with the given tag name.
     * The complete document is searched, including the root node.
     * The returned HTMLCollection is live, meaning that it updates itself automatically to stay in sync
     * with the DOM treewithout having to call document.getElementsByTagName() again.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document.getElementsByTagName
     *
     * @param {string} tagName
     * @return {HTMLCollection}
     */
    getElementsByTagName(tagName, _array) {
        return this.documentElement.getElementsByTagName(tagName, _array);
    }

    getElementsByClassName(className) {
        throw new Error('Not implemented');
    }

    /**
     * Returns the first element within the document (using depth-first pre-order traversal of the document's nodes|by
     * first element in document markup and iterating through sequential nodes by order of amount of child nodes)
     * that matches the specified group of selectors.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
     *
     * @param {string} selector
     * @return {Element}
     */
    querySelector(selector) {
        return this.documentElement.querySelector(selector);
    }

    /**
     * Returns a list of the elements within the document (using depth-first pre-order traversal of the document's
     * nodes) that match the specified group of selectors. The object returned is a NodeList.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
     *
     * @param {string} selector
     * @return {NodeList}
     */
    querySelectorAll(selector) {
        return this.documentElement.querySelectorAll(selector);
    }

    /**
     * textContent returns null if the element is a document, a document type, or a notation.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
     */
    get textContent() {
        return null;
    }

    get location() {
        return this._location;
    }

    set location(value) {
        this._location.href = value;
    }
}

/**
 * @constant {number} Comment#nodeType
 */
Object.defineProperty(Document.prototype, 'nodeType', { value: Node.DOCUMENT_NODE });
