export class KeyButton extends HTMLElement {
	constructor() {
		super();
	}
	private _value?: string = "";
	private _key = "";
	desc = "";
	height = 30;
	width = 30;
	hidden = false;
	get key() {
		return this._key;
	}
	set key(value: string) {
		this._key = value;
		this.connectedCallback();
	}

	get value() {
		return this._value;
	}
	set value(value: string) {
		this._value = value;
		this.connectedCallback();
	}

	connectedCallback() {
		this.innerHTML = `<div class="wrapper">
        <div class="key-hidden">${this.value}</div>
        <div>${this.key}</div>
      </div>`;
	}
}

customElements.define("key-button", KeyButton);
