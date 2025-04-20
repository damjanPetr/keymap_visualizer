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
		this._data = value;
		this.connectedCallback();
	}

	adoptedCallback() {}

	connectedCallback() {
		console.log("%c ", "background: yellow", Object.keys(this._data));
		this.innerHTML = `
      <div>
        <h1>Map Context</h1>
        <p>${Object.keys(this?._data).map((item) => `<button value="${item}">${item}</button>`)}</p>
      </div>
    `;

		const button = this.querySelector("button");
		if (button) {
			button.addEventListener("click", () => {
				console.log(button.value);
			});
		}
	}
}

customElements.define("map-context", MapContext);
