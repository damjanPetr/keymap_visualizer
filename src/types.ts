import type { layoutsArray } from "./utils/consts";

export interface LayoutData {
	left: string[][];
	right: string[][];
}

interface Cell {
	key: string;
	value: string;
	desc: string;
	voiceCommand: string;
}

export interface KeysideData {
	context: Record<string, KeysideData>;
	left: Cell[];
	right: Cell[];
}

export type SelectedLayout = (typeof layoutsArray)[number]["value"];
