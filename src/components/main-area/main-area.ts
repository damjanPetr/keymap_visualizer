import type { KeysideData, LayoutData } from "../../types";
import { changeLoadout, fetchKeyLayout } from "../../fetch";
import type { KeyboardSide } from "../keyboard-side/keyboard-side";
import "../map-context/map-context";
import type { MapContext } from "../map-context/map-context";
import { store } from "../../store/keyStore";
import { layoutsArray } from "../../utils/helpers";

export class MainArea extends HTMLElement {
	constructor() {
		super();
	}

	mapData: KeysideData | null = null;

	async connectedCallback() {
		this.innerHTML = `
      <x-map-context></x-map-context>
      <div class="keyboards-container">
            <x-keyboard-side side="left"></x-keyboard-side>
               <select>
               ${layoutsArray
									.map(
										({ value, name }) =>
											`<option value="${value}">${name}</option>`,
									)
									.join()}
               </select>
           <x-keyboard-side side="right"></x-keyboard-side>
      </div>`;

		store.subscribe<typeof this.applyMapData>(
			this.applyMapData.bind(this),
			"test",
		);
		const layout = await fetchKeyLayout("main");
		const keyData = await changeLoadout("win-key");

		store.setState({ layout, keyData }, "test");
		console.log("%c mapData", "background: plum", {
			layout,
			keyData,
		});

		const select = this.querySelector("select");
		select?.addEventListener("change", async (e) => {
			if (e.target instanceof HTMLSelectElement) {
				const value = e.target.value;
				const newData = await changeLoadout(value);
				this.applyMapData({ layout, keyData: newData });
			}
		});
	}

	applyMapData({
		layout,
		keyData,
	}: { layout: LayoutData; keyData: KeysideData }) {
		const context = this.querySelector("x-map-context") as MapContext;
		context.data = keyData?.context;

		const leftSide = this.querySelector(
			"x-keyboard-side:nth-of-type(1)",
		) as KeyboardSide;
		const rightSide = this.querySelector(
			"x-keyboard-side:nth-of-type(2)",
		) as KeyboardSide;

		if (leftSide) {
			leftSide.keyRows = layout.left;
			leftSide.keyCells = keyData.left;
		}

		if (rightSide) {
			rightSide.keyRows = layout.right;
			rightSide.keyCells = keyData.right;
		}
	}
}

const registerMainArea = () => {
	customElements.define("x-main-area", MainArea);
};

export { registerMainArea };
