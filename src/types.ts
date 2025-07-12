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

export interface ContextItem {
	key: string;
	name: string;
	left: Cell[];
	right: Cell[];
}

export interface KeysideData {
	context: ContextItem[];
	left: Cell[];
	right: Cell[];
	selectedContext?: string;
}

export type SelectedLayout = (typeof layoutsArray)[number]["value"];
