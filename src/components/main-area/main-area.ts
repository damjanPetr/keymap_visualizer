import { store } from "../../store/keyStore";
import type { KeysideData, LayoutData, SelectedLayout } from "../../types";
import { changeLoadout, fetchKeyLayout } from "../../utils/fetch";
import { layoutsArray } from "../../utils/helpers";
import type { KeyboardSide } from "../keyboard-side/keyboard-side";

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
				keyData: {
					...keyData,
					selectedContext: "",
				},
				selectedLayout: "win-key",
			},
			"globalKeyMap",
		);
		store.setState(
			{
				layout,
				keyData,
				selectedLayout: "win-key",
			},
			"test",
		);

		this.innerHTML = `
      <x-active-context></x-active-context>
      <div class="keyboards-container">
            <x-keyboard-side side="left"></x-keyboard-side>
               <select></select>
           <x-keyboard-side side="right"></x-keyboard-side>
      </div>`;

		const select = this.querySelector("select");

		select?.addEventListener("change", async (e) => {
			if (e.target instanceof HTMLSelectElement) {
				const value = e.target.value as SelectedLayout;
				const keyData = await changeLoadout(value);
				const newData = {
					layout,
					keyData: {
						...keyData,
						selectedContext: "",
					},
					selectedLayout: value,
				};
				store.setState(newData, "globalKeyMap");
				store.setState(newData, "test");
			}
		});
		this.render();
	}

	render() {
		const { keyData, layout, selectedLayout } = store.getState("test");
		console.log("%c ", "background: blue", { keyData, layout, selectedLayout });

		const selectedElement = this.querySelector("select");
		if (selectedElement instanceof HTMLSelectElement) {
			selectedElement.innerHTML = layoutsArray
				.map(
					({ value, name }) =>
						`<option ${value === selectedLayout ? "selected" : ""} value="${value}">${name}</option>`,
				)
				.join("");
		}

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
