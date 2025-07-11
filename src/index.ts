import { registerMapContext } from "./components/active-context/active-context";
import { registerBottomPanel } from "./components/bottom-panel/bottom-panel";
import { registerKeyButton } from "./components/key-button/key-button";
import { registerKeyboardSide } from "./components/keyboard-side/keyboard-side";
import { registerMainArea } from "./components/main-area/main-area";
import { registerRouter } from "./components/my-router/my-router";
import type { SelectedLayout } from "./types";
import { moveLayout } from "./utils/helpers";

const app = () => {
	registerBottomPanel();
	registerRouter();
	registerMainArea();
	registerKeyButton();
	registerMapContext();
	registerKeyboardSide();
};

document.addEventListener("DOMContentLoaded", app);

document.addEventListener("keydown", async (event) => {
	const currentLayout = document.querySelector("select")
		?.value as SelectedLayout;
	if (!currentLayout) return;
	switch (event.key) {
		case "Escape": {
			break;
		}
		case "ArrowUp": {
			await moveLayout("up", currentLayout);
			break;
		}

		case "ArrowDown": {
			await moveLayout("down", currentLayout);
			break;
		}
		default: {
			break;
		}
	}
});
