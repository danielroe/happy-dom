import HTMLElement from '../html-element/HTMLElement';
import IHTMLFormElement from './IHTMLFormElement';
import Event from '../../event/Event';
import HTMLFormControlsCollection from './HTMLFormControlsCollection';
import IHTMLFormControlsCollection from './IHTMLFormControlsCollection';
import INode from '../node/INode';
import IHTMLInputElement from '../html-input-element/IHTMLInputElement';
import IHTMLTextAreaElement from '../html-text-area-element/IHTMLTextAreaElement';
import IHTMLSelectElement from '../html-select-element/IHTMLSelectElement';
import IHTMLButtonElement from '../html-button-element/IHTMLButtonElement';

/**
 * HTML Form Element.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement.
 */
export default class HTMLFormElement extends HTMLElement implements IHTMLFormElement {
	// Public properties.
	public readonly elements: IHTMLFormControlsCollection = new HTMLFormControlsCollection();
	public readonly length = 0;

	// Events
	public onformdata: (event: Event) => void | null = null;
	public onreset: (event: Event) => void | null = null;
	public onsubmit: (event: Event) => void | null = null;

	// Private properties
	public _formNode: INode = this;

	/**
	 * Returns name.
	 *
	 * @returns Name.
	 */
	public get name(): string {
		return this.getAttribute('name') || '';
	}

	/**
	 * Sets name.
	 *
	 * @param name Name.
	 */
	public set name(name: string) {
		this.setAttribute('name', name);
	}

	/**
	 * Returns method.
	 *
	 * @returns Method.
	 */
	public get method(): string {
		return this.getAttribute('method') || 'get';
	}

	/**
	 * Sets method.
	 *
	 * @param method Method.
	 */
	public set method(method: string) {
		this.setAttribute('method', method);
	}

	/**
	 * Returns target.
	 *
	 * @returns Target.
	 */
	public get target(): string {
		return this.getAttribute('target') || '';
	}

	/**
	 * Sets target.
	 *
	 * @param target Target.
	 */
	public set target(target: string) {
		this.setAttribute('target', target);
	}

	/**
	 * Returns action.
	 *
	 * @returns Action.
	 */
	public get action(): string {
		return this.getAttribute('action') || '';
	}

	/**
	 * Sets action.
	 *
	 * @param action Action.
	 */
	public set action(action: string) {
		this.setAttribute('action', action);
	}

	/**
	 * Returns encoding.
	 *
	 * @returns Encoding.
	 */
	public get encoding(): string {
		return this.getAttribute('encoding') || '';
	}

	/**
	 * Sets encoding.
	 *
	 * @param encoding Encoding.
	 */
	public set encoding(encoding: string) {
		this.setAttribute('encoding', encoding);
	}

	/**
	 * Returns enctype.
	 *
	 * @returns Enctype.
	 */
	public get enctype(): string {
		return this.getAttribute('enctype') || '';
	}

	/**
	 * Sets enctype.
	 *
	 * @param enctype Enctype.
	 */
	public set enctype(enctype: string) {
		this.setAttribute('enctype', enctype);
	}

	/**
	 * Returns autocomplete.
	 *
	 * @returns Autocomplete.
	 */
	public get autocomplete(): string {
		return this.getAttribute('autocomplete') || '';
	}

	/**
	 * Sets autocomplete.
	 *
	 * @param autocomplete Autocomplete.
	 */
	public set autocomplete(autocomplete: string) {
		this.setAttribute('autocomplete', autocomplete);
	}

	/**
	 * Returns accept charset.
	 *
	 * @returns Accept charset.
	 */
	public get acceptCharset(): string {
		return this.getAttribute('acceptcharset') || '';
	}

	/**
	 * Sets accept charset.
	 *
	 * @param acceptCharset Accept charset.
	 */
	public set acceptCharset(acceptCharset: string) {
		this.setAttribute('acceptcharset', acceptCharset);
	}

	/**
	 * Returns no validate.
	 *
	 * @returns No validate.
	 */
	public get noValidate(): string {
		return this.getAttribute('novalidate') || '';
	}

	/**
	 * Sets no validate.
	 *
	 * @param noValidate No validate.
	 */
	public set noValidate(noValidate: string) {
		this.setAttribute('novalidate', noValidate);
	}

	/**
	 * Submits form.
	 */
	public submit(): void {
		this.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
	}

	/**
	 * Resets form.
	 */
	public reset(): void {
		this.dispatchEvent(new Event('reset', { bubbles: true, cancelable: true }));
	}

	/**
	 * Reports validity.
	 *
	 * @returns "true" if validation does'nt fail.
	 */
	public reportValidity(): boolean {
		return this.checkValidity();
	}

	/**
	 * Checks validity.
	 *
	 * @returns "true" if validation does'nt fail.
	 */
	public checkValidity(): boolean {
		for (const element of this.elements) {
			if (!(<IHTMLInputElement | IHTMLTextAreaElement>element).checkValidity()) {
				return false;
			}
		}
	}

	/**
	 * Clones a node.
	 *
	 * @override
	 * @param [deep=false] "true" to clone deep.
	 * @returns Cloned node.
	 */
	public cloneNode(deep = false): IHTMLFormElement {
		return <IHTMLFormElement>super.cloneNode(deep);
	}

	/**
	 * Appends a form control item.
	 *
	 * @param node Node.
	 * @param name Name
	 */
	public _appendFormControlItem(
		node: IHTMLInputElement | IHTMLTextAreaElement | IHTMLSelectElement | IHTMLButtonElement,
		name: string
	): void {
		if (!this.elements.includes(node)) {
			this.elements.push(node);
			this[this.elements.length] = node;
			(<number>this.length) = this.elements.length;
		}

		(<HTMLFormControlsCollection>this.elements)._appendNamedItem(node, name);
		this[name] = this.elements[name];
	}

	/**
	 * Remove a form control item.
	 *
	 * @param node Node.
	 * @param name Name.
	 */
	public _removeFormControlItem(
		node: IHTMLInputElement | IHTMLTextAreaElement | IHTMLSelectElement | IHTMLButtonElement,
		name: string
	): void {
		const index = this.elements.indexOf(node);

		if (index !== -1) {
			this.elements.splice(index, 1);
			for (let i = index; i < this.length; i++) {
				this[i] = this[i + 1];
			}
			delete this[this.length - 1];
			(<number>this.length)--;
		}

		(<HTMLFormControlsCollection>this.elements)._removeNamedItem(node, name);

		if (this.elements[name]) {
			this[name] = this.elements[name];
		} else {
			delete this[name];
		}
	}
}
