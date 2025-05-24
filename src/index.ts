import { registerBottomPanel } from "./components/bottom-panel/bottom-panel";
import { registerKeyButton } from "./components/key-button/key-button";
import { registerKeyboardSide } from "./components/keyboard-side/keyboard-side";
import { registerMainArea } from "./components/main-area/main-area";
import { registerMapContext } from "./components/map-context/map-context";
import { registerRouter } from "./components/my-router/my-router";

const app = () => {
	registerBottomPanel();
	registerRouter();
	registerMainArea();
	registerKeyButton();
	registerMapContext();
	registerKeyboardSide();
};

document.addEventListener("DOMContentLoaded", app);
