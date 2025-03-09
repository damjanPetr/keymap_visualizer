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
      console.log("%c path", 'background: red',)

      this.loadPage(window.location.pathname)

    })
    document.addEventListener("click", (event) => {
      const target = (event.target as HTMLAnchorElement).closest("a");
      if (target && target.origin === window.location.origin && target.tagName === "A") {
        console.log("%c event", 'background: yellow', event)
        event.preventDefault()
        history.pushState({}, "", target.href)
        this.loadPage(target.href)

      }

    })

  }
  connectedCallback() {
    this.init()
  }
}
customElements.define("my-router", Router)
