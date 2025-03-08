class Router extends HTMLElement {
  constructor() {
    super()
  };
  async loadPage(path: string) {
    const page = await fetch(`/pages${path || "404.html"}`)
    this.innerHTML = await page.text()
  }
  init() {
    window.addEventListener("popstate", () => {

      this.loadPage(window.location.pathname)
    })
  }
  connectedCallback() {
    this.init()
  }
}
customElements.define("my-router", Router)
