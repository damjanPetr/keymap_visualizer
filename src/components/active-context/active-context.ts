import { store } from "../../store/keyStore";

export class MapContext extends HTMLElement {
	constructor() {
		super();
	}

	adoptedCallback() {}

	connectedCallback() {
		this.render();
	}

	render() {
		const data = store.getState("main");
		if ("key" in data.keyData) return;

		const newContext = data.keyData.context.map(
			(item) =>
				`<button class="selectContextButton" value="${item.key}">${item.name}</button>`,
		);

		this.innerHTML = `
    		<button class="goUpButton">Go up</button>
        <p>${newContext.join("")}</p>
    `;

		const button = this.querySelector(".selectContextButton");
		const goUpButton = this.querySelector(".goUpButton");

		if (goUpButton) {
			if (data.keyData.selectedContext) return;
			goUpButton.addEventListener("click", () => {
				store.setState({ ...data }, "test");
			});
		}

		if (button) {
			button.addEventListener("click", () => {
				if (!(button instanceof HTMLButtonElement)) return;
				if (!button.value) return;
				const { keyData, selectedLayout, layout } = data;
				if ("key" in keyData) return;

				const context = keyData.context.find(
					(item) => item.key === button.value,
				);

				if (context)
					store.setState(
						{
							layout: layout,
							keyData: { ...context, selectedContext: context.key },
							selectedLayout: selectedLayout,
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
