import { fixPngToSvg } from "../../utils/helpers";

export class KeyButton extends HTMLElement {
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
		this.buttonKey = this.getAttribute("buttonKey") || "";
		this.plusStyle = this.getAttribute("plusStyle") || "";

		this.render();
	}

	render() {
		let html = "";
		let classList = "";
		if (this.value === "") {
			classList += "empty";
		}
		let style = `style="${this.plusStyle ? this.plusStyle : ""}"`;

		if (this.value[0] === "/") {
			html += `<img ${style} src="icons/${this.value}.png" />`;
		} else {
			html += `<div class="noDesc">${this.value}</div>`;
		}

		const voiceCommand = this.voiceCommand
			? `<div class="voice-command">${this.voiceCommand}</div>`
			: "";

		const desc = this.desc ? `<div class="desc">${this.desc}</div>` : "";
		if (this.desc && this.value === "") {
			classList += " hasDesc";
		}
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
