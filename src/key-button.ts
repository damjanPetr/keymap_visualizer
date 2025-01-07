import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("key-button")
export class KeyButton extends LitElement {
  static styles = css``;

  @property() text?: string;

  render() {
    return html`<div>${this.text}</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "key-button": KeyButton;
  }
}
