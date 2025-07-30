import { fixPngToSvg } from "../../utils/helpers";

export class KeyButton extends HTMLElement {
	static observedAttributes = ["value", "desc", "voiceCommand", "plusStyle"];

	constructor(
		public buttonKey: string,
		public value: string,
		public desc: string,
		public voiceCommand: string,
		public plusStyle: string,
	) {
		super();
	}

	connectedCallback() {
		this.value = this.getAttribute("value") || "";
		this.desc = this.getAttribute("desc") || "";
		this.voiceCommand = this.getAttribute("voiceCommand") || "";
		this.plusStyle = this.getAttribute("plusStyle") || "";

		this.render();
	}

	render() {
		let iconElement = "";
		let classList = "";
		if (this.value === "") {
			classList += "empty";
		}
		const imgStyle = this.plusStyle && `style="${this.plusStyle}"`;

		if (this.value[0] === "/") {
			iconElement = `<img ${imgStyle} src="icons/${this.value}.png" />`;
		} else {
			iconElement = `<div class="noDesc">${this.value}</div>`;
		}

		const voiceCommand =
			this.voiceCommand &&
			`<div class="voice-command">${this.voiceCommand}</div>`;

		// console.log("%c voiceCommand", "background: pink", this.voiceCommand);
		const desc = this.desc && `<div class="desc">${this.desc}</div>`;
		if (this.desc && this.value === "") {
			classList += " hasDesc";
		}
		this.innerHTML = `<div class="wrapper ${classList}">
        <div class="key-hidden">
        ${voiceCommand}
        ${desc}
        </div>
        ${iconElement}
      </div>`;
		fixPngToSvg(this.querySelector("img"));
	}

	attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
		switch (name) {
			case "value":
			case "desc":
			case "voiceCommand":
			case "plusStyle":
				this[name] = newValue;
				break;
		}
		this.render();
	}
}

const registerKeyButton = () => {
	customElements.define("x-key-button", KeyButton);
};

export { registerKeyButton };
