import type { KeysideData, LayoutData } from "../../types";
import { changeLoadout, fetchKeyLayout } from "../../fetch";
import type { KeyboardSide } from "../keyboard-side/keyboard-side";
import "../map-context/map-context";
import type { MapContext } from "../map-context/map-context";
import { store } from "../../store/keyStore";

export class MainArea extends HTMLElement {
	constructor() {
		super();
	}

	mapData: KeysideData | null = null;

	async init() {
		const layout = await fetchKeyLayout("main");
		const keyData = await changeLoadout("key");

		return { layout, keyData };
	}
	async connectedCallback() {
		this.innerHTML = `
      <x-map-context></x-map-context>
      <div class="keyboards-container">
            <x-keyboard-side side="left"></x-keyboard-side>
               <select>
                 <option value="key">Key</option>
                 <option value="zed">Zed</option>
                 <option value="obsidian">Obsidian</option>
               </select>
           <x-keyboard-side side="right"></x-keyboard-side>
      </div>`;

		store.subscribe<typeof this.applyMapData>(
			this.applyMapData.bind(this),
			"test",
		);

		const { layout, keyData } = await this.init();

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
		console.log("%c uoauoa", "background: blue", { leftSide });

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
