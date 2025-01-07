import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { parsedData } from "./main";
import { Keywell, Thumbs } from "./types";
import "./key-button";

@customElement("left-keyboard")
export class LeftKeyboard extends LitElement {
  static styles = css``;
  keys = parsedData["left"] as Keywell;
  thumbKeys = parsedData["left-thumbs"] as Thumbs;

  rows() {
    return html`<div>
      ${this.keys["1-row"].map((item) => {
        return html`<key-button>${item.value}</key-button>`;
      })}
      ${this.keys["2-row"].map((item) => {
        return html`<key-button>${item.value}</key-button>`;
      })}
      ${this.keys["3-row"].map((item) => {
        return html`<key-button>${item.value}</key-button>`;
      })}
      ${this.keys["4-row"].map((item) => {
        return html`<key-button>${item.value}</key-button>`;
      })}
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
    return html`
      <div class="left-keys">${this.rows()}</div>

      <div class="left-thumbs"
          ${this.thumbs()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "left-keyboard": LeftKeyboard;
  }
}
