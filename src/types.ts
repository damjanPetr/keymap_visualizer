import type { layoutsArray } from "./utils/consts";

export interface LayoutData {
	left: string[][];
	right: string[][];
}

export interface Cell {
	key: string;
	value: string;
	desc: string;
	voiceCommand: string;
	plusStyle?: string;
}

export interface KeymapContextItem {
	key: string;
	name: string;
	value: string;
	left: Cell[];
	right: Cell[];
}

export interface KeysideData {
	context: KeymapContextItem[];
	left: Cell[];
	right: Cell[];
	selectedContext: string;
}

export interface StoreValues {
	layout: LayoutData;
	keyData: KeysideData | KeymapContextItem;
	selectedLayout?: SelectedLayout;
}

export interface Store {
	test: StoreValues;
	globalKeyMap: StoreValues;
}
export type SelectedLayout = (typeof layoutsArray)[number]["value"];
