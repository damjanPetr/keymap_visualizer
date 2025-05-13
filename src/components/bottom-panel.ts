export class BottomPanel extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `<footer>Footer</footer>`;
	}
}

customElements.define("x-bottom-panel", BottomPanel);
