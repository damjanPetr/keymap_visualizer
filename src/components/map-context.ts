class mapContext extends HTMLElement {
  static getObservedAttributes() {
    return []
  }
  constructor() {
    super()
  }

  adoptedCallback(){
  }

  connectedCallback(){
    this.innerHTML = `
      <div>
        <h1>Map Context</h1>
        <p>This is a custom element that provides a map context.</p>
      </div>
    `;
  }

  attributeChangedCallback(){
  }
}

customElements.define('map-context', mapContext)
