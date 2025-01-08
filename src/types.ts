type RowNames = "1-row" | "2-row" | "3-row" | "4-row";
type ThumbsNames = "big-0" | "big-1" | "top-0" | "top-1" | "side-0" | "side-1";

interface Cell {
  key: number;
  value: string | number;
}
export type Keywell = Record<RowNames, Cell[]>;

export type Thumbs = Record<ThumbsNames, { [x: string]: string }>;
