import { changeLoadout, fetchKeyLayout } from "../../utils/fetch";
import { store } from "../../store/keyStore";
import type { KeysideData, LayoutData, SelectedLayout } from "../../types";
import { layoutsArray } from "../../utils/helpers";
import type { KeyboardSide } from "../keyboard-side/keyboard-side";
import type { MapContext } from "../active-context/active-context";

export class MainArea extends HTMLElement {
	constructor() {
		super();
	}
	keyData?: KeysideData;
	selectedLayout?: SelectedLayout;
	layout?: LayoutData;

	async connectedCallback() {
		store.subscribe(this.render.bind(this), "test");
		const keyData = await changeLoadout("win-key");
		const layout = await fetchKeyLayout("main");
		store.setState(
			{
				layout,
				keyData,
				selectedLayout: "win-key",
			},
			"main",
		);
		store.setState(
			{
				layout,
				keyData,
				selectedLayout: "win-key",
			},
			"test",
		);
	}

	render() {
		const { keyData, layout, selectedLayout } = store.getState("test");
		console.log("%c ", "background: blue", { keyData, layout, selectedLayout });

		this.innerHTML = `
      <x-active-context></x-active-context>
      <div class="keyboards-container">
            <x-keyboard-side side="left"></x-keyboard-side>
               <select value=${selectedLayout}>
               ${layoutsArray
									.map(
										({ value, name }) =>
											`<option value="${value}">${name}</option>`,
									)
									.join()}
               </select>
           <x-keyboard-side side="right"></x-keyboard-side>
      </div>`;

		const select = this.querySelector("select");

		select?.addEventListener("change", async (e) => {
			if (e.target instanceof HTMLSelectElement) {
				const value = e.target.value as SelectedLayout;
				const keyData = await changeLoadout(value);
				if (this.layout) {
					store.setState({ layout, keyData, selectedLayout: value }, "test");
				}
			}
		});

		const leftSide = this.querySelector(
			"x-keyboard-side:nth-of-type(1)",
		) as KeyboardSide;
		const rightSide = this.querySelector(
			"x-keyboard-side:nth-of-type(2)",
		) as KeyboardSide;
		if (leftSide && rightSide) {
			leftSide.data = { cells: keyData.left, rows: layout.left };
			rightSide.data = {
				cells: keyData?.right,
				rows: layout?.right,
			};
		}
	}
}

const registerMainArea = () => {
	customElements.define("x-main-area", MainArea);
};

export { registerMainArea };
