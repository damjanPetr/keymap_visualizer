import { store } from "../../store/keyStore";
import type { StoreValues } from "../../types";
import "./keypad-element.css";

export class KeypadElement extends HTMLElement {
	static observedAttributes = [];
	constructor() {
		super();
	}
	#data: StoreValues | undefined = undefined;
	get data() {
		return this.#data;
	}
	set data(value) {
		this.#data = value;
		this.render();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (!this.data) {
			return;
		}


		const layoutRows = this.data.layout.left
      .map(row => row.map(rowKey =>this.data?.keyData.left.find((item) => item.key === rowKey))).flat();

		console.log( "%c v",'background: pink',{layoutRows})
		this.innerHTML = `${layoutRows.map((data) => {

		                if(!data) return '';

						return `<x-key-button
           					value="${data.value}"
           					desc="${data.desc}"
           					key="${data.key}"
           					plusStyle="${data.plusStyle}">
           					voiceCommand="${data.voiceCommand}"
         					</x-key-button>`
			}).join("")}
		</div>
		`;
	}
	disconnectedCallback() {}

	adoptedCallback() {}

	attributeChangedCallback() {}
}

customElements.define("x-keypad-element", KeypadElement);
