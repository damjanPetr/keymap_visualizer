import { LitElement } from "lit";
import { LeftKeyboard } from "./left-keyboard";
import { RightKeyboard } from "./right-keyboard";

let globalSheets = null;
export function getGlobalStyleSheets() {
  if (globalSheets === null) {
    globalSheets = Array.from(document.styleSheets).map((x) => {
      const sheet = new CSSStyleSheet();
      const css = Array.from(x.cssRules)
        .map((rule) => rule.cssText)
        .join(" ");
      sheet.replaceSync(css);
      return sheet;
    });
  }

  return globalSheets;
}

function addStylesToGlobal(element: LitElement) {
  element.styles = [
    ...getGlobalStyleSheets(),
    ...(Array.isArray(element.styles)
      ? element.styles
      : element.styles
        ? [element.styles]
        : []),
  ];
}

addStylesToGlobal(LeftKeyboard);
addStylesToGlobal(RightKeyboard);
