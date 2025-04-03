import type { LayoutData } from "../types";
import { changeLoadout } from "../fetch";
import "./keyboard-side";
import { KeyboardSide } from "./keyboard-side";

export class MainArea extends HTMLElement {
  static get template() {
    const template = document.createElement("template")
    template.innerHTML = `
        <keyboard-side></keyboard-side>
        <select>
          <option value="key">Key</option>
          <option value="zed">Zed</option>
        </select>
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
    const templateClone = MainArea.template.content as DocumentFragment;
    this.innerHTML = "";
    this.appendChild(templateClone);

    const mapData: LayoutData = await this.init();
    const select = this.querySelector('select');

    select?.addEventListener("change", async (e) => {
      if (e.target instanceof HTMLSelectElement) {
        const value = e.target.value;
        const newData = await changeLoadout(value);
        this.applyMapData(newData);
      }
    });

    this.applyMapData(mapData);
  }

  applyMapData(data: LayoutData) {

    const leftSide = this.querySelector('keyboard-side:nth-of-type(1)') as KeyboardSide;
    const rightSide = this.querySelector('keyboard-side:nth-of-type(2)') as KeyboardSide;

    if (leftSide) {
      leftSide.keys = data.left;
      leftSide.thumbKeys = data["left-thumbs"];
    }

    if (rightSide) {
      rightSide.keys = data.right;
      rightSide.thumbKeys = data["right-thumbs"];
    }
  }
}

customElements.define('main-area', MainArea);
