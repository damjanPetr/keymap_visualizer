import { parse } from "yaml";
import { KeysideData, LayoutData } from "./types";

async function changeLoadout(layout: string): Promise<KeysideData> {
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
