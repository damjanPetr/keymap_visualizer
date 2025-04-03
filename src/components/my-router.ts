export class Router extends HTMLElement {
	constructor() {
		super();
	}
	async loadPage(path: string) {
		let slot = this.querySelector("slot");
		if(!slot) return;
		if(path === "/") path = "index";
			const page = await fetch(`./pages/${path || "404"}.html`);
		const pageHTML = await page.text();
		slot.innerHTML = pageHTML;
	}
	init() {
		window.addEventListener("popstate", () => {
			this.loadPage(window.location.pathname);
		});
		document.addEventListener("click", (event) => {
			const target = (event.target as HTMLAnchorElement).closest("a");
			if (
				target &&
				target.origin === window.location.origin &&
				target.tagName === "A"
			) {
				event.preventDefault();
				const url = new URL(target.href);
				history.pushState({}, "", target.href);
				this.loadPage(url.pathname);
			}
		});
	}
	connectedCallback() {
		this.init();
	}
}
customElements.define("my-router", Router);
