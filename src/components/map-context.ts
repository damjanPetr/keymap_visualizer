import { KeysideData } from "../types";

export class MapContext extends HTMLElement {

  constructor() {
    super()
  }



  _data: KeysideData['context'] = {};
  get data() {
    return this._data;
  }

  set data(value) {
    this._data = value;
    this.connectedCallback()
  }

  adoptedCallback(){
  }

  connectedCallback(){
    console.log( "%c ",'background: yellow',Object.keys(this._data))
    this.innerHTML = `
      <div>
        <h1>Map Context</h1>
        <p>${Object.keys(this?._data).map(item =>`<button>${item}</button>`)}</p>
      </div>
    `;
  }



}

customElements.define('map-context', MapContext)
