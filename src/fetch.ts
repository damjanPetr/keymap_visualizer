import { parse } from "yaml";

const response = await fetch("src/backend/key.yaml");
const data = await response.text();

let parsedData = parse(data);

console.log("%c ", "background: blue", parsedData);

async function changeLoadout(layout: string) {
  const response = await fetch(`src/backend/zed.yaml`);
  const data = await response.text();
  parsedData = parse(data);
  return parsedData;
}

export { parsedData, changeLoadout };
