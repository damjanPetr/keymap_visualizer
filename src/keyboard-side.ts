import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./key-button";
import type { Keywell, Thumbs } from "./types";

@customElement("keyboard-side")
export class KeyboardSide extends LitElement {
  static styles = css``;

  @property() keys!: Keywell;
  @property() thumbKeys!: Thumbs;

  rows() {
    console.log("%c ", "background: pink", this.keys["1-row"]);
    return html`<div>
      <div class="1-row">
        ${this?.keys["1-row"].map((item) => {
          return html`<key-button>${item.key} ${item.value}</key-button>`;
        })}
      </div>

      <div class="2-row">
        ${this?.keys["2-row"].map((item) => {
          return html`<key-button>${item.value}</key-button>`;
        })}
      </div>

      <div class="3-row">
        ${this.keys["3-row"].map((item) => {
          return html`<key-button>${item.value}</key-button>`;
        })}
      </div>

      <div class="4-row">
        ${this.keys["4-row"].map((item) => {
          return html`<key-button>${item.value}</key-button>`;
        })}
      </div>
    </div>`;
  }

  thumbs() {
    return html`<div>
      <div>${this.thumbKeys["big-0"]}</div
      <div>${this.thumbKeys["big-1"]}</div>
      <div>${this.thumbKeys["top-0"]}</div>
      <div>${this.thumbKeys["top-1"]}</div>
      <div>${this.thumbKeys["side-0"]}</div>
      <div>${this.thumbKeys["side-1"]}</div>
    </div>`;
  }

  render() {
    return html`<div class="rows">
      ${this.rows()}
      <div>
        <div class="thumbs">${this.thumbs()}</div>
      </div>
    </div> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "keyboard-side": KeyboardSide;
  }
}
