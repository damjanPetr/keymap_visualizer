import { store } from "../../store/keyStore";
import type { KeysideData, SelectedLayout } from "../../types";

export class MapContext extends HTMLElement {
	constructor() {
		super();
	}

	adoptedCallback() {}

	connectedCallback() {
		this.render();
	}

	render() {
		const data = store.getState("test");
		console.log("%c ", "background: yellow", { heh: data });

		this.innerHTML = `
      <div>
        <p>${data.keyData.context.map((item) => `<button value="${item.key}">${item.name}</button>`)}</p>
      </div>
    `;

		const button = this.querySelector("button");
		if (button) {
			button.addEventListener("click", () => {
				const value = button.value;
				if (!value) return;
				store.setState(
					{
						layout: data.layout,
						keyData: data.keyData?.context.find((item) => item.key === value),
						selectedLayout: data.selectedLayout,
					},
					"test",
				);
			});
		}
	}
}

const registerMapContext = () => {
	customElements.define("x-active-context", MapContext);
};

export { registerMapContext };
