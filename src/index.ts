import { registerBottomPanel } from "./components/bottom-panel";
import { registerKeyButton } from "./components/key-button";
import { registerMainArea } from "./components/main-area";
import { registerRouter } from "./components/my-router";

const app = () => {
	registerBottomPanel();
	registerRouter();
	registerMainArea();
	registerKeyButton();
};

document.addEventListener("DOMContentLoaded", app);
