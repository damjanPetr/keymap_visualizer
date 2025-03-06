import { Keywell, Thumbs } from "../types";
import { changeLoadout, parsedData } from "../fetch";
import "./keyboard-side";

("main-area")
export class MainArea extends LitElement {
  static styles = css`
    :host {
      padding-top: 2rem;
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      place-items: center center;
      background: silver;
    }
  `;
  @property() parsedDataP = parsedData;

  leftKeyboard = {
    keys: this.parsedDataP["left"] as Keywell,
    thumbs: this.parsedDataP["left-thumbs"] as Thumbs,
  };

  rightKeyboard = {
    keys: this.parsedDataP["right"] as Keywell,
    thumbs: this.parsedDataP["right-thumbs"] as Thumbs,
  };
  async getTest() {
    const newParsedData = await changeLoadout(this.value);

    this.parsedDataP = newParsedData;
    this.requestUpdate();

    // this.leftKeyboard = {
    //   keys: newParsedData["left"] as Keywell,
    //   thumbs: newParsedData["left-thumbs"] as Thumbs,
    // };

    // this.rightKeyboard = {
    //   keys: newParsedData["right"] as Keywell,
    //   thumbs: newParsedData["right-thumbs"] as Thumbs,
    // };
  }

  render() {
    return html`
      <keyboard-side
        .keys=${this.rightKeyboard.keys}
        .thumbKeys=${this.rightKeyboard.thumbs}
      ></keyboard-side>
      <select @change="${this.getTest}" id="test" value="key">
        <option value="key">Key</option>
        <option value="zed">Zed</option>
      </select>
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
