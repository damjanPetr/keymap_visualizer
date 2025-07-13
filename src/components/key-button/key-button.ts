import { fixPngToSvg } from "../../utils/helpers";

export class KeyButton extends HTMLElement {
	static observedAttributes = ["value", "desc", "hidden"];

	constructor() {
		super();
	}
	value = "";
	buttonKey = "";
	desc = "";
	voiceCommand = "";

	attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
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
		let html = "";
		let classList = "";
		if (this.value === "") {
			classList += "empty";
		}
		if (this.value[0] === "/") {
			html += `<img src="icons/${this.value}.png" />`;
		} else {
			html += `<div>${this.value}</div>`;
		}

		const voiceCommand = this.voiceCommand
			? `<div class="voice-command">${this.voiceCommand}</div>`
			: "";

		const desc = this.desc ? `<div class="desc">${this.desc}</div>` : "";

		this.innerHTML = `<div class="wrapper ${classList}">
        <div class="key-hidden">
        ${voiceCommand}
        ${desc}
        </div>

        ${html}
      </div>`;
		fixPngToSvg(this.querySelector("img"));
	}
}

const registerKeyButton = () => {
	customElements.define("x-key-button", KeyButton);
};

export { registerKeyButton };
