import { parse } from "yaml";
import { LayoutData } from "./types";

async function changeLoadout(layout: string): Promise<LayoutData> {
  const response = await fetch(`src/backend/${layout}.yaml`);
  const data = await response.text();
  return parse(data);
}

export { changeLoadout };
