import { KeySide, LayoutData } from "../types";
import { changeLoadout } from "../fetch";
import "./keyboard-side";
import { KeyboardSide } from "./keyboard-side";

export class MainArea extends HTMLElement {
  constructor() {
    super()
  }

  mapData: LayoutData | null = null;

  leftKeyboard: KeySide | null = null;
  rightKeyboard: KeySide | null = null;
  async init() {
    this.mapData = await changeLoadout('key')

    this.leftKeyboard = {
      keys: this.mapData["left"],
      thumbs: this.mapData["left-thumbs"]
    };

    this.rightKeyboard = {
      keys: this.mapData["right"],
      thumbs: this.mapData["right-thumbs"]
    };
  }
  async connectedCallback() {

    this.innerHTML = `<div>Loading...</div>`;
    await this.init()
    this.innerHTML = ""

    const leftSide = document.createElement('keyboard-side') as KeyboardSide;
    const rightSide = document.createElement('keyboard-side') as KeyboardSide;

    leftSide.keys = this.leftKeyboard?.keys;
    leftSide.thumbKeys = this.leftKeyboard?.thumbs;
    rightSide.keys = this.rightKeyboard?.keys;
    rightSide.thumbKeys = this.rightKeyboard?.thumbs

    this.appendChild(leftSide);
    this.appendChild(leftSide);
    this.appendChild(rightSide)
  }
}
customElements.define('main-area', MainArea)
