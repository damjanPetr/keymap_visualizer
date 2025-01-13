import { LitElement } from "lit";
import { KeyboardSide } from "../components/keyboard-side";

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

addStylesToGlobal(KeyboardSide);
