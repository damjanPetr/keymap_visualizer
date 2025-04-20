import "./key-button";
import type { KeysideData, LayoutData } from "../types";

export class KeyboardSide extends HTMLElement {
	constructor() {
		super();
	}

	private _keyRows?: LayoutData["left"] = [];
	private _keyCells?: KeysideData["left"] = [];

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

	generateKeyButton(row: Rows["1-row"], node: Element | null) {
		// row.forEach((cellData) => {
		//   const kb = document.createElement("key-button") as KeyButton
		//   kb.key = String(cellData.key);
		//   kb.value = String(cellData.value);
		//   if (node) {
		//     node.appendChild(kb)
		//   }
		// })
	}

	side: "left" | "right" | undefined;

	connectedCallback() {
		this.innerHTML = `<div class="rows">
    ${this._keyRows
			?.map(
				(row) => `<div>
       ${row
					.map((cellData) => {
						const selected = this.keyCells?.find(
							(cell) => cell.key === cellData,
						);
						if (!selected)
							return '<key-button value="1" desc="no value" key="//"></key-button>';

						const button = `<key-button value="${selected?.value}" desc="${selected?.desc}" key="${selected?.key}"></key-button>`;
						return button;
					})
					.join("")}
          </div>`,
			)
			.join("")}
      </div>
       <div class="thumbs">
       </div>
    `;

		for (const { desc, value, key } of this?._keyCells) {
			const keyButton = this.querySelector(`key-button[key="${key}"]`);
			if (keyButton) {
				keyButton?.setAttribute("value", value);
				keyButton?.setAttribute("desc", desc);
			}
		}
	}
}

customElements.define("keyboard-side", KeyboardSide);
