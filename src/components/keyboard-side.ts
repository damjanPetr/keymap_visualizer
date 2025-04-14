import "./key-button";
import type { LayoutData, Rows, Thumbs } from "../types";
import { KeyButton } from "./key-button";

export class KeyboardSide extends HTMLElement {
  constructor() {
    super()
  }

  private _keyRows?: LayoutData['left'] = [];
  private _thumbKeys?: Thumbs;

  set keyRows(value) {
    this._keyRows = value;
    this.connectedCallback();
  }

  get keyRows() {
    return this._keyRows;
  }

  set thumbKeys(value) {
    this._thumbKeys = value;
    this.connectedCallback();
  }

  get thumbKeys() {
    return this._thumbKeys;
  }
  generateKeyButton(row: Rows['1-row'], node: Element | null) {
    // row.forEach((cellData) => {
    //   const kb = document.createElement("key-button") as KeyButton
    //   kb.key = String(cellData.key);
    //   kb.value = String(cellData.value);

    //   if (node) {
    //     node.appendChild(kb)
    //   }
    // })

  }


  side: "left" | "right" |undefined

  connectedCallback() {
    this.innerHTML =
      `<div class="rows">
    ${this._keyRows?.map((row) =>  `<div>
       ${row.map((cellData) => `<key-button key="${cellData}" value="${cellData}"></key-button>`)}
          </div>`)}
      </div>
       <div class="thumbs">
       </div>
    `;

      }
}

customElements.define("keyboard-side", KeyboardSide);
