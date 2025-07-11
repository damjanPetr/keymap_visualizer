import { store } from "../store/keyStore";
import type { SelectedLayout } from "../types";
import { layoutsArray } from "./consts";
import { changeLoadout, fetchKeyLayout } from "./fetch";

export const moveLayout = async (
	side: "up" | "down",
	layoutName: SelectedLayout,
) => {
	const layoutIndex = layoutsArray.findIndex(
		(layout) => layout.value === layoutName,
	);
	if (layoutIndex === -1) return;
	const layout = await fetchKeyLayout("main");

	if (side === "up") {
		const nextLayout = layoutsArray[layoutIndex + 1].value;
		const keyData = await changeLoadout(nextLayout);
		store.setState({ layout, keyData, selectedLayout: nextLayout }, "test");
		return;
	}
	const nextLayout = layoutsArray[layoutIndex - 1].value;
	const keyData = await changeLoadout(nextLayout);
	store.setState({ layout, keyData, selectedLayout: nextLayout }, "test");
};
export { layoutsArray };
