import { KeysideData } from "../types";

export class MapContext extends HTMLElement {
  static getObservedAttributes() {
    return []
  }
  constructor() {
    super()
  }



  _data: KeysideData['context'] = {};
  get data() {
    return this._data;
  }

  set data(value) {
    this._data = value;
  }

  adoptedCallback(){
  }

  connectedCallback(){
    console.log( "%c ",'background: hotpink',Object.keys(this._data))
    this.innerHTML = `
      <div>
        <h1>Map Context</h1>
        <p>${Object.keys(this.data).map(item =>`<button>${item}</button>`)}</p>
      </div>
    `;
  }

  attributeChangedCallback(){
  }
}

customElements.define('map-context', MapContext)
