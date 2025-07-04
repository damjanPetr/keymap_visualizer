import { store } from "../../store/keyStore";
import type { KeysideData, SelectedLayout } from "../../types";

export class MapContext extends HTMLElement {
	constructor() {
		super();
	}

	_data: KeysideData["context"] = {};
	get data() {
		return this._data;
	}

	set data(value) {
		if (value) this._data = value;
		this.render();
	}

	adoptedCallback() {}

	connectedCallback() {
		this.render();
	}

	render() {
		this.innerHTML = `
      <div>
        <p>${Object.keys(this?._data).map((item) => `<button value="${item}">${item}</button>`)}</p>
      </div>
    `;

		const button = this.querySelector("button");
		if (button) {
			button.addEventListener("click", () => {
				const value = button.value as SelectedLayout;
				const data = store.getState("test");
				store.setState(
					{
						layout: data.layout,
						keyData: data.keyData?.context[value],
						selectedLayout: value,
					},
					"test",
				);
			});
		}
	}
}

const registerMapContext = () => {
	customElements.define("x-map-context", MapContext);
};

export { registerMapContext };
