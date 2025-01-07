import { parse } from "yaml";

const response = await fetch("src/key.yaml");
const data = await response.text();

const parsedData = parse(data);

console.log("%c ", "background: blue", parsedData);

export { parsedData };
