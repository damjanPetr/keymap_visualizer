import type { KeysideData, LayoutData } from "../types";
import { changeLoadout, fetchKeyLayout } from "../fetch";
import { KeyboardSide } from "./keyboard-side";
import "./map-context"
import { MapContext } from "./map-context";

export class MainArea extends HTMLElement {
  constructor() {
    super()
  }

  mapData: KeysideData | null = null;

  async init() {
    const layout = await fetchKeyLayout('main')
    const keyData =  await changeLoadout('key')
    return {layout,keyData}
  }
  async connectedCallback() {
    this.innerHTML = `
      <map-context></map-context>
      <div class="keyboards-container">
            <keyboard-side side="left"></keyboard-side>
               <select>
                 <option value="key">Key</option>
                 <option value="zed">Zed</option>
               </select>
           <keyboard-side side="right"></keyboard-side>
      </div>
      `

    const {layout,keyData} = await this.init();
    console.log( "%c mapData",'background: plum',{layout,keyData})
    const select = this.querySelector('select');
    select?.addEventListener("change", async (e) => {
      if (e.target instanceof HTMLSelectElement) {
        const value = e.target.value;
        const newData = await changeLoadout(value);
        this.applyMapData({ layout, keyData: newData });
      }
    });
    this.applyMapData({layout,keyData});
  }


  applyMapData({layout,keyData}:{layout:LayoutData,keyData:KeysideData}) {
    const context =  this.querySelector("map-context") as MapContext;
    context.data = keyData.context

    const leftSide = this.querySelector('keyboard-side:nth-of-type(1)') as KeyboardSide;
    const rightSide = this.querySelector('keyboard-side:nth-of-type(2)') as KeyboardSide;

    if (leftSide) {
      leftSide.keyRows = layout.left;
      leftSide.keyCells = keyData.left;
    }

    if (rightSide) {
      rightSide.keyRows = layout.right;
      rightSide.keyCells = keyData.right;
    }
  }
}

customElements.define('main-area', MainArea);
