import { registerBottomPanel } from "./components/bottom-panel/bottom-panel";
import { registerKeyButton } from "./components/key-button/key-button";
import { registerMainArea } from "./components/main-area/main-area";
import { registerRouter } from "./components/my-router/my-router";

const app = () => {
	registerBottomPanel();
	registerRouter();
	registerMainArea();
	registerKeyButton();
};

document.addEventListener("DOMContentLoaded", app);
