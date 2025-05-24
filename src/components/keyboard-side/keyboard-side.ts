import "../key-button/key-button";
import type { KeysideData, LayoutData } from "../../types";
import type { KeyButton } from "../key-button/key-button";

export class KeyboardSide extends HTMLElement {
	constructor() {
		super();
	}

	private _keyRows?: LayoutData["left"] = [];
	private _keyCells?: KeysideData["left"] = [];
	side: "left" | "right" | undefined;

	set keyCells(value) {
		this._keyCells = value;
		this.connectedCallback();
	}

	get keyCells() {
		return this._keyCells;
	}

	set keyRows(value) {
		this._keyRows = value;
		this.connectedCallback();
	}

	get keyRows() {
		return this._keyRows;
	}

	generateKeyButton(layoutKeyValue: string): KeyButton {
		const kb = document.createElement("key-button") as KeyButton;
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
		this.innerHTML = `
		<div class="rows">
    </div>
    `;

		for (const keyRow of this.keyRows) {
			const rowEl = document.createElement("div");
			for (const key of keyRow) {
				const kb = this.generateKeyButton(key);
				rowEl.appendChild(kb);
			}
			this.querySelector(".rows")?.append(rowEl);
		}
	}
}

customElements.define("x-keyboard-side", KeyboardSide);

const registerKeyboardSide = () => {
	customElements.define("x-keyboard-side", KeyboardSide);
};

export { registerKeyboardSide };
