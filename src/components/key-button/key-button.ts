export class KeyButton extends HTMLElement {
	constructor() {
		super();
	}
	value = "";
	buttonKey = "";
	desc = "";

	height = 30;
	width = 30;

	hidden = false;

	observedAttributes = ["value", "desc", "hidden"];

	attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
		if (name === "value") {
			this.value = newValue;
			this.render();
		}
		if (name === "desc") {
			this.desc = newValue;
			this.render();
		}
		if (name === "hidden") {
			this.hidden = newValue === "true";
			this.render();
		}
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.innerHTML = `<div class="wrapper">
        <div class="key-hidden">${this.value}</div>
        <div>${this.buttonKey}</div>
      </div>`;
	}
}

const registerKeyButton = () => {
	customElements.define("x-key-button", KeyButton);
};

export { registerKeyButton };
