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
		const data = store.getState("globalKeyMap");
		const testData = store.getState("test");
		if (!isKeysideDataItem(data.keyData)) return;

		const newContext = data.keyData?.context?.map((item) => {
			if (!isKeysideDataItem(testData.keyData)) return;
			const icons = item.value
				? `<img src="icons/${item.value}.png" alt="${item.name}" />`
				: item.name;

			return `
			<button tooltip="${item.name}" class="selectContextButton
    		${item.key === testData.keyData.selectedContext ? "active" : ""}"
        value="${item.key}">
			   ${icons}
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

		const img = this.querySelectorAll("img");

		img.length;
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
