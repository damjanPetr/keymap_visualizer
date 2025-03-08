type RowNames = "1-row" | "2-row" | "3-row" | "4-row";
type ThumbsName = "big-0" | "big-1" | "top-0" | "top-1" | "side-0" | "side-1";

interface Cell {
  key: number;
  value: string | number;
}
export type Rows = Record<RowNames, Cell[]>;

export type Thumbs = Record<ThumbsName, { [x: string]: string }>;

export interface KeySide {
  'keys': Rows;
  'thumbs': Thumbs;
}

export interface LayoutData {
  'left': Rows;
  'right': Rows;
  'left-thumbs': Thumbs;
  'right-thumbs': Thumbs;
}
