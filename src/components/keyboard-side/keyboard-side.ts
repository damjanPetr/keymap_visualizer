import "../key-button/key-button";
import type { KeysideData, LayoutData } from "../../types";

export class KeyboardSide extends HTMLElement {
	constructor() {
		super();
	}
	side?: "left" | "right";
	private rows?: LayoutData["left"] = [];
	private cells?: KeysideData["left"] = [];

	set data(value: { cells: KeysideData["left"]; rows: LayoutData["left"] }) {
		this.cells = value.cells;
		this.rows = value.rows;
		this.render();
	}

	connectedCallback() {
		this.render();
	}
	render() {
		this.innerHTML = `
    <div class="rows">
    ${this.rows
			?.map((row) => {
				const elements = row.map((rowCell) => {
					const selected = this.cells?.find((cell) => cell.key === rowCell);
					if (selected?.key) {
						return `<x-key-button
						value="${selected.value}"
						desc="${selected.desc}"
						key="${selected.key}"
						${selected.voiceCommand ? `voiceCommand="${selected.voiceCommand}"` : ""}>
						</x-key-button>`;
					}
					return `<x-key-button value="1" desc="no value" key="\\"></x-key-button>`;
				});
				return `<div>${elements.join("")}</div>`;
			})
			.join("")}</div>
       `;
	}
}

const registerKeyboardSide = () => {
	customElements.define("x-keyboard-side", KeyboardSide);
};

export { registerKeyboardSide };
