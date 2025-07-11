import { parse } from "yaml";
import type { KeysideData, LayoutData } from "../types";

export async function changeLoadout(layout: string): Promise<KeysideData> {
	const response = await fetch(`backend/${layout}.yaml`);
	const data = await response.text();
	return parse(data);
}

export async function fetchKeyLayout(side: string): Promise<LayoutData> {
	const response = await fetch(`backend/layouts/${side}.yaml`);
	const data = await response.text();
	return parse(data);
}
