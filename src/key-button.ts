import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("key-button")
export class KeyButton extends LitElement {
  static styles = css`
    button:hover {
      outline: 2px solid blue;
    }
    button {
    }
  `;

  @property() heigth = 30;
  @property() width = 30;
  render() {
    return html`<button>
      <slot />
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "key-button": KeyButton;
  }
}
