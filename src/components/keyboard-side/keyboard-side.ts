import "../key-button/key-button";
import type { KeysideData, LayoutData } from "../../types";
import type { KeyButton } from "../key-button/key-button";

export class KeyboardSide extends HTMLElement {
	constructor() {
		super();
	}

	private keyRows?: LayoutData["left"] = [];
	private keyCells?: KeysideData["left"] = [];
	side?: "left" | "right";

	set data(value: { cells: KeysideData["left"]; rows: LayoutData["left"] }) {
		this.keyCells = value.cells;
		this.keyRows = value.rows;
		this.connectedCallback();
	}

	generateKeyButton(layoutKeyValue: string): KeyButton {
		const kb = document.createElement("x-key-button") as KeyButton;
		const selected = this.keyCells?.find((cell) => cell.key === layoutKeyValue);
		if (!selected?.key) {
			kb.value = "1";
			kb.desc = "no value";
			kb.key = "\\";
		} else {
			kb.key = selected.key;
			kb.value = selected.value;
			kb.desc = selected.desc;
		}
		return kb;
	}
	connectedCallback() {
		this.render();
	}
	render() {
		this.innerHTML = `
    <div class="rows">
       </div>
       `;

		for (const keyRow of this?.keyRows ?? []) {
			const rowEl = document.createElement("div");
			for (const key of keyRow) {
				const kb = this.generateKeyButton(key);
				rowEl.appendChild(kb);
			}
			this.querySelector(".rows")?.append(rowEl);
		}
	}
}

const registerKeyboardSide = () => {
	customElements.define("x-keyboard-side", KeyboardSide);
};

export { registerKeyboardSide };
