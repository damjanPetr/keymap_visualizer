import {  LayoutData } from "../types";
import { changeLoadout } from "../fetch";
import "./keyboard-side";
import { KeyboardSide } from "./keyboard-side";

export class MainArea extends HTMLElement {
  static get template() {
    const template = document.createElement("template")
    template.innerHTML = `
        <keyboard-side></keyboard-side>
        <div>mainTest</div>
        <keyboard-side></keyboard-side>
    `;
    return template;
  }

  constructor() {
    super()
  }

  mapData: LayoutData | null = null;
  async init() {

    return await changeLoadout('key')
  }
  async connectedCallback() {
const mapData:LayoutData =     await this.init()

    this.innerHTML = ""

    const template = MainArea.template.content

    const leftSide = template.querySelector('keyboard-side:nth-of-type(1)') as KeyboardSide;
    const rightSide = template.querySelector('keyboard-side:nth-of-type(2)') as KeyboardSide;

    leftSide.keys = mapData.left;
    leftSide.thumbKeys = mapData["left-thumbs"];

    rightSide.keys = mapData.right;
    rightSide.thumbKeys = mapData["right-thumbs"];
     this.append(template);

  }
}
customElements.define('main-area', MainArea)
