import "./components/index";
import type { SelectedLayout } from "./types";
import { moveLayout } from "./utils/helpers";

document.addEventListener("DOMContentLoaded", () => {});

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
