export class KeyButton extends HTMLElement {
	static observedAttributes = ["value", "desc", "hidden"];

	constructor() {
		super();
	}
	value = "";
	buttonKey = "";
	desc = "";

	attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
		console.log("%c name", "background: teal", {
			name,
			newValue,
			oldValue: _oldValue,
		});
		if (name === "key") {
			this.buttonKey = newValue;
			this.render();
		}

		if (name === "value") {
			this.value = newValue;
			this.render();
		}
		if (name === "desc") {
			this.desc = newValue;
			this.render();
		}
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.innerHTML = `<div class="wrapper">
        <div class="key-hidden">${this.desc}</div>
        <div>${this.value}</div>
      </div>`;
	}
}

const registerKeyButton = () => {
	customElements.define("x-key-button", KeyButton);
};

export { registerKeyButton };
