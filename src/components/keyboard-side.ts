import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./key-button";
import type { Keywell, Thumbs } from "../types";

@customElement("keyboard-side")
export class KeyboardSide extends LitElement {
  static styles = css`
    .rows {
       > div{
            display: flex;
            gap: 0.5rem;
            width: 100%;
            justify-content: space-between;
            margin-bottom: 0.5rem
        }
    }

    .thumbs {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: 50px 100px 50px 100px;
        gap: 0.5rem;
    }
    }
  `;

  @property() keys!: Keywell;
  @property() thumbKeys!: Thumbs;

  rows() {
    return html`
      <div class="1-row">
        ${this?.keys["1-row"].map((item) => {
          return html`<key-button .value=${item.value} .key=${item.key}
            >${item.key}</key-button
          >`;
        })}
      </div>

      <div class="2-row">
        ${this?.keys["2-row"].map((item) => {
          return html`<key-button .value=${item.value} .key=${item.key}
            >${item.value}</key-button
          >`;
        })}
      </div>

      <div class="3-row">
        ${this.keys["3-row"].map((item) => {
          return html`<key-button .value=${item.value} .key=${item.key}
            >${item.value}</key-button
          >`;
        })}
      </div>

      <div class="4-row">
        ${this.keys["4-row"].map((item) => {
          return html`<key-button .value=${item.value} .key=${item.key}
            >${item.value}</key-button
          >`;
        })}
      </div>
    `;
  }

  thumbs() {
    return html`<div>${this.thumbKeys["big-0"]}</div
      <div>${this.thumbKeys["big-1"]}</div>
      <div>${this.thumbKeys["top-0"]}</div>
      <div>${this.thumbKeys["top-1"]}</div>
      <div>${this.thumbKeys["side-0"]}</div>
      <div>${this.thumbKeys["side-1"]}</div>`;
  }

  render() {
    return html`
      <div class="rows">${this.rows()}</div>
      <div class="thumbs">${this.thumbs()}</div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "keyboard-side": KeyboardSide;
  }
}
