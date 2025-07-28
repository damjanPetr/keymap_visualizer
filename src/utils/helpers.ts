import { store } from "../store/keyStore";
import type { ContextItem, KeysideData, SelectedLayout } from "../types";
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

export function isContextItem(item: unknown): item is ContextItem {
	if (typeof item !== "object" || item === null || !("name" in item)) {
		return false;
	}
	return true;
}

export function isKeysideDataItem(item: unknown): item is KeysideData {
	if (
		typeof item !== "object" ||
		item === null ||
		!("selectedContext" in item)
	) {
		return false;
	}
	return true;
}

export function fixPngToSvg(
	img: HTMLImageElement | NodeListOf<HTMLImageElement> | null,
) {
	if (!img) return;
	if ("length" in img) {
		img.forEach((i) => {
			i.addEventListener("error", () => {
				i.src = i.src.replace(".png", ".svg");
			});
		});
	} else {
		img.addEventListener("error", () => {
			img.src = img.src.replace(".png", ".svg");
		});
	}
}
