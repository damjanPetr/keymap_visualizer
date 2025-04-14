export class MapContext extends HTMLElement {
  static getObservedAttributes() {
    return []
  }
  constructor() {
    super()
  }



  _data: any[] = [];
  get data() {
    return this._data;
  }

  set data(value) {
    this._data = value;
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

customElements.define('map-context', MapContext)
