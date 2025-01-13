import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("bottom-panel")
export class BottomPanel extends LitElement {
  static styles = css`
    :host {
      margin: 0 auto;
      height: 50px;

      display: flex;
      justify-content: center;
      align-items: center;
    }
    footer {
      background: salmon;
      width: 50%;
      border: 2px solid white;
    }
  `;

  render() {
    return html`<footer>footer</footer>`;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "bottom-panel": BottomPanel;
  }
}
