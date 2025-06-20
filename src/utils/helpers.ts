import { changeLoadout, fetchKeyLayout } from "../fetch";
import { store } from "../store/keyStore";

export const mapLayoutDataToKeys = () => {
	return;
};

export const layoutsArray = [
	{ value: "vimium", name: "Vimium" },
	{ value: "obsidian", name: "Obsidian" },
	{ value: "win-key", name: "Windows keys" },
	{ value: "zed", name: "Zed" },
];

export const moveLayout = async (side: "up" | "down", layoutName: string) => {
	const layoutIndex = layoutsArray.findIndex(
		(layout) => layout.value === layoutName,
	);
	if (layoutIndex === -1) return;
	const layout = await fetchKeyLayout("main");

	if (side === "up") {
		const nextLayout = layoutsArray[layoutIndex + 1].value;
		const keyData = await changeLoadout(nextLayout);
		store.setState({ layout, keyData, selectedLayout: nextLayout }, "test");
	} else {
		const nextLayout = layoutsArray[layoutIndex - 1].value;

		const keyData = await changeLoadout(nextLayout);
		store.setState({ layout, keyData, selectedLayout: nextLayout }, "test");
	}
};
