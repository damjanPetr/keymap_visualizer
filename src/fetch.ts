import { parse } from "yaml";
import type { KeysideData, LayoutData } from "./types";

async function changeLoadout(layout: string): Promise<KeysideData> {
	console.log("%c uheou", "background: green", { layout });
	const response = await fetch(`src/backend/${layout}.yaml`);
	const data = await response.text();
	return parse(data);
}

async function fetchKeyLayout(side: string): Promise<LayoutData> {
	const response = await fetch(`src/backend/layouts/${side}.yaml`);
	const data = await response.text();
	return parse(data);
}

export { changeLoadout, fetchKeyLayout };
