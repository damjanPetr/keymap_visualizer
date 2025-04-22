import { store } from "../store/keyStore";
import type { KeysideData } from "../types";

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
		this.connectedCallback();
	}

	adoptedCallback() {}

	connectedCallback() {
		if (this._data) {
			console.log("%c ", "background: yellow", Object.keys(this._data));
		}
		this.innerHTML = `
      <div>
        <p>${Object.keys(this?._data).map((item) => `<button value="${item}">${item}</button>`)}</p>
      </div>
    `;

		const button = this.querySelector("button");
		if (button) {
			button.addEventListener("click", () => {
				const data = store.getState("test");
				console.log(button.value, data.keyData.context[button.value]);
				store.setState(
					{ layout: data.layout, keyData: data.keyData?.context[button.value] },
					"test",
				);
			});
		}
	}
}

customElements.define("map-context", MapContext);
