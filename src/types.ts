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
}

export interface ContextItem extends LayoutData {
	key: string;
	name: string;
}

export interface KeysideData {
	context: ContextItem[];
	left: Cell[];
	right: Cell[];
}

export type SelectedLayout = (typeof layoutsArray)[number]["value"];
