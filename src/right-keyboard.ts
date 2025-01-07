import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("right-keyboard")
export class RightKeyboard extends LitElement {
  static styles = css``;

  render() {
    return html`<p>uhtenoautneao</p>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "right-keyboard": RightKeyboard;
  }
}
