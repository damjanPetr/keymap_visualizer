import { fixPngToSvg } from "../../utils/helpers";

export class KeyButton extends HTMLElement {
	static observedAttributes = ["value", "desc", "voice-command", "plus-style"];

	buttonKey = "";
	value = "";
	desc = "";
	voiceCommand = "";
	plusStyle = "";

	constructor() {
		super();
	}

	connectedCallback() {
		this.value = this.getAttribute("value") || "";
		this.desc = this.getAttribute("desc") || "";
		this.voiceCommand = this.getAttribute("voice-command") || "";
		this.plusStyle = this.getAttribute("plus-style") || "";

		this.render();
	}

	render() {
		let iconElement = "";
		let classList = "";
		if (this.value === "") {
			classList += " empty";
		}
		const imgStyle = this.plusStyle && `style="${this.plusStyle}"`;

		if (this.value && this.value[0] === "/") {
			iconElement = `<img ${imgStyle} src="icons/${this.value}.png" />`;
		} else {
			iconElement = `<div class="noDesc">${this.value}</div>`;
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
			${iconElement}
		</div>`;
		const img = this.querySelector("img");
		if (img) {
			fixPngToSvg(img);
		}
	}

	attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
		switch (name) {
			case "value":
				this.value = newValue;
				break;
			case "desc":
				this.desc = newValue;
				break;
			case "voice-command":
				this.voiceCommand = newValue;
				break;
			case "plus-style":
				this.plusStyle = newValue;
				break;
		}
		this.render();
	}
}

const registerKeyButton = () => {
	customElements.define("x-key-button", KeyButton);
};

export { registerKeyButton };
