import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Keywell, Thumbs } from "../types";
import { parsedData } from "../fetch";
import "./keyboard-side";

@customElement("main-area")
export class MainArea extends LitElement {
  static styles = css`
    :host {
      display: grid;
      grid-template-columns: 1fr 1fr;
      place-items: center center;
      background: teal;
    }
  `;

  @property() leftKeyboard = {
    keys: parsedData["left"] as Keywell,
    thumbs: parsedData["left-thumbs"] as Thumbs,
  };

  @property() rightKeyboard = {
    keys: parsedData["right"] as Keywell,
    thumbs: parsedData["right-thumbs"] as Thumbs,
  };

  render() {
    return html`
      <keyboard-side
        .keys=${this.rightKeyboard.keys}
        .thumbKeys=${this.rightKeyboard.thumbs}
      ></keyboard-side>
      <keyboard-side
        .keys=${this.leftKeyboard.keys}
        .thumbKeys=${this.leftKeyboard.thumbs}
      ></keyboard-side>
    `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "main-area": MainArea;
  }
}
