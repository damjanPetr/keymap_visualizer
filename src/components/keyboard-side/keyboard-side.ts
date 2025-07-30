import "../key-button/key-button";
import type { KeysideData, LayoutData } from "../../types";
import { store } from "../../store/keyStore";

export class KeyboardSide extends HTMLElement {
	side: "left" | "right";
	private rows?: LayoutData["left"] = [];
	private cells?: KeysideData["left"] = [];

	set data(value: {
		cells: KeysideData["left"];
		rows: LayoutData["left"];
	}) {
		this.cells = value.cells;
		this.rows = value.rows;
		this.render();
	}

	constructor() {
		super();
		this.side = this.getAttribute("side") as typeof this.side;
	}

	connectedCallback() {
		const side = this.side;
		if (!side) return;

		const { layout, keyData } = store.getState("test");
		console.log("%c green", "background: test", { mest: layout[side] });
		const rows = layout[side]
			?.map((row) => {
				const keyButtonElementns = row.map((rowCellKey) => {
					const selected = keyData[side]?.find(
						(cell) => cell.key === rowCellKey,
					);
					if (!selected?.key)
						return `<x-key-button value="1" desc="no value" key="\\"></x-key-button>`;

					return `<x-key-button
           					value="${selected.value}"
           					desc="${selected.desc}"
           					key="${selected.key}"
           					plusStyle="${selected.plusStyle}">
           					voiceCommand="${selected.voiceCommand}"
         					</x-key-button>`;
				});

				return `<div>${keyButtonElementns.join("")}</div>`;
			})
			.join("");

		this.innerHTML = `<div class="rows">${rows}</div>`;

		this.render();
	}
	render() {
		console.log("%c uhetoaueas", "background: skyblue", {
			rows: this.rows,
			cells: this.cells,
		});
		this.cells?.forEach((cell) => {
			const test = this.querySelector(`x-key-button[key="${cell.key}"]`);

			test?.setAttribute("value", cell.value);
			test?.setAttribute("desc", cell.desc);
			test?.setAttribute("voiceCommand", cell.voiceCommand);
			test?.setAttribute("plusStyle", cell?.plusStyle || "");
		});
	}
}

const registerKeyboardSide = () => {
	customElements.define("x-keyboard-side", KeyboardSide);
};

export { registerKeyboardSide };
