import IHTMLElement from '../html-element/IHTMLElement';

/**
 * HTML Button Element.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement.
 */
export default interface IHTMLButtonElement extends IHTMLElement {
	name: string;
	value: string;
	disabled: boolean;
	type: string;

	/**
	 * Checks validity.
	 *
	 * @returns Validity.
	 */
	checkValidity(): boolean;
}
