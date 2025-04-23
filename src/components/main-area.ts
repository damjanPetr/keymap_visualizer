import type { KeysideData, LayoutData } from "../types";
import { changeLoadout, fetchKeyLayout } from "../fetch";
import type { KeyboardSide } from "./keyboard-side";
import "./map-context";
import type { MapContext } from "./map-context";
import { store } from "../store/keyStore";

export class MainArea extends HTMLElement {
	constructor() {
		super();
	}

	mapData: KeysideData | null = null;

	async init() {
		const layout = await fetchKeyLayout("main");
		const keyData = await changeLoadout("key");

		// store.subscribe(this.applyMapData);
		return { layout, keyData };
	}
	async connectedCallback() {
		this.innerHTML = `
      <map-context></map-context>
      <div class="keyboards-container">
            <keyboard-side side="left"></keyboard-side>
               <select>
                 <option value="key">Key</option>
                 <option value="zed">Zed</option>
                 <option value="obsidian">Obsidian</option>
               </select>
           <keyboard-side side="right"></keyboard-side>
      </div>
      `;

		store.subscribe(this.applyMapData.bind(this), "test");

		const { layout, keyData } = await this.init();

		// const { layout, keyData } = store.getState("test");
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
		const context = this.querySelector("map-context") as MapContext;
		context.data = keyData?.context;

		const leftSide = this.querySelector(
			"keyboard-side:nth-of-type(1)",
		) as KeyboardSide;
		const rightSide = this.querySelector(
			"keyboard-side:nth-of-type(2)",
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

customElements.define("main-area", MainArea);
