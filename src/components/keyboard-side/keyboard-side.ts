import "../key-button/key-button";
import type { KeysideData, LayoutData } from "../../types";
import { KeyButton } from "../key-button/key-button";

export class KeyboardSide extends HTMLElement {
	constructor() {
		super();
	}

	private rows?: LayoutData["left"] = [];
	private cells?: KeysideData["left"] = [];
	side?: "left" | "right";

	set data(value: { cells: KeysideData["left"]; rows: LayoutData["left"] }) {
		this.cells = value.cells;
		this.rows = value.rows;
		this.render();
	}

	connectedCallback() {
		this.render();
	}
	render() {
		console.log("left", { cells: this.cells, rows: this.rows });
		this.innerHTML = `
    <div class="rows">
    ${this.rows
			?.map((row) => {
				const elements = row.map((rowCell) => {
					const selected = this.cells?.find((cell) => cell.key === rowCell);
					if (selected?.key) {
						return `<x-key-button value="${selected.value}" desc="${selected.desc}" key="${selected.key}"></x-key-button>`;
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
