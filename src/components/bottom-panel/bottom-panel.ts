export class BottomPanel extends HTMLElement {
	connectedCallback() {
		this.innerHTML = "<footer>Footer</footer>";
	}
}

export const registerBottomPanel = () => {
	customElements.define("x-bottom-panel", BottomPanel);
};
