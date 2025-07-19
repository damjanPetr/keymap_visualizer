import { store } from "../../store/keyStore";
import { fixPngToSvg, isKeysideDataItem } from "../../utils/helpers";

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
		const testData = store.getState("test");
		console.log("%c ", "background: red", { test: data.keyData, testData });
		if (!isKeysideDataItem(data.keyData)) return;

		const newContext = data.keyData?.context?.map((item) => {
			if (!isKeysideDataItem(testData.keyData)) return;
			console.log("%c ", "background: magenta", {
				item,
			});

			return `
			<button tooltip="${item.name}" class="selectContextButton
    		${item.key === testData.keyData.selectedContext ? "active" : ""}"
        value="${item.key}">
			   <img src="icons${item.value}.png" alt="${item.name}" />
			</button>`;
		});

		if (!data.keyData.context) {
			this.innerHTML = `
        <p class="noContext">No context available</p>
    `;
			return;
		}
		this.innerHTML = `
    		<button class="goUpButton">Go up</button>
        <div>${newContext.join("")}</div>
    `;
		const img = this.querySelector("img");
		// todo
		fixPngToSvg(img);

		const button = this.querySelectorAll(".selectContextButton");
		const goUpButton = this.querySelector(".goUpButton");

		if (goUpButton) {
			if (data.keyData.selectedContext) return;
			goUpButton.addEventListener("click", () => {
				store.setState({ ...data }, "test");
			});
		}

		if (button.length) {
			button.forEach((btn) => {
				if (!(btn instanceof HTMLButtonElement)) return;
				btn.addEventListener("click", () => {
					if (!btn.value) return;
					const { keyData, selectedLayout, layout } = data;
					if ("key" in keyData) return;

					const context = keyData.context.find(
						(item) => item.key === btn.value,
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
			});
		}
	}
}

const registerMapContext = () => {
	customElements.define("x-active-context", MapContext);
};

export { registerMapContext };
