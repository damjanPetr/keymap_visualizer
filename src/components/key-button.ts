export class KeyButton extends HTMLElement {
	constructor() {
		super();
		this.height = 30;
		this.width = 30;
		this.hidden = false;
	}
	height: number;
	width: number;
	hidden: boolean;
	get key() {
		return this.getAttribute("key");
	}
	set key(value: string) {
		this.setAttribute("key", value);
	}

	get value() {
		return this.getAttribute("value");
	}
	set value(value: string | null) {
		this.setAttribute("value", value);
	}

	connectedCallback() {
		this.innerHTML = `<div class="wrapper">
        <div class="key-hidden">${this.value}</div>
        <div>${this.key}</div>
      </div>`;
	}
}

customElements.define("key-button", KeyButton);
