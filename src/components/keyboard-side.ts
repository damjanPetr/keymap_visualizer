import "./key-button";
import type { Rows, Thumbs } from "../types";
import { KeyButton } from "./key-button";

export class KeyboardSide extends HTMLElement {
  static observedAttributes = ["keys", "thumbKeys"];

  constructor() {
    super()
  }

    // Add private backing fields
  private _keys?: Rows;
  private _thumbKeys?: Thumbs;

  set keys(value) {
    this._keys = value;
    this.connectedCallback();
  }

  get keys() {
    return this._keys;
  }

  set thumbKeys(value) {
    this._thumbKeys = value;
    this.connectedCallback();
  }

  get thumbKeys() {
    return this._thumbKeys;
  }
  generateKb(row: Rows['1-row'], node: Element | null) {
    row.forEach((cellData) => {
      const kb = document.createElement("key-button") as KeyButton
      kb.key = String(cellData.key);
      kb.value = String(cellData.value);

      if (node) {
        node.appendChild(kb)
      }
    })

  }


  connectedCallback() {
    this.innerHTML =
      `<div class="rows">
            <div class="row"></div>
            <div class="row"></div>
            <div class="row"></div>
            <div class="row"></div>
      </div>

       <div class="thumbs">
         <div>${this.thumbKeys?.["big-0"]}</div>
         <div>${this.thumbKeys?.["big-1"]}</div>
         <div>${this.thumbKeys?.["top-0"]}</div>
         <div>${this.thumbKeys?.["top-1"]}</div>
         <div>${this.thumbKeys?.["side-0"]}</div>
         <div>${this.thumbKeys?.["side-1"]}</div>
       </div>
    `;

    const row1 = this.querySelector(".rows > .row:nth-child(1)");
    const row2 = this.querySelector(".rows > .row:nth-child(2)");
    const row3 = this.querySelector(".rows > .row:nth-child(3)");
    const row4 = this.querySelector(".rows > .row:nth-child(4)");
    console.log("%c uhotueo", 'background: pink', { row1, row2, row3, row4, meh: this.keys?.["1-row"] })

    this.generateKb(this.keys?.["1-row"] ?? [], row1);
    this.generateKb(this.keys?.["2-row"] ?? [], row2);
    this.generateKb(this.keys?.["3-row"] ?? [], row3);
    this.generateKb(this.keys?.["4-row"] ?? [], row4)
  }
}

customElements.define("keyboard-side", KeyboardSide);
