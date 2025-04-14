export interface LayoutData {
  left: string[][];
  right: string[][];
}

interface Cell {
  key: string;
  value: string;
  desc: string ;
}



export interface KeysideData {
  'left': Cell[];
  'right': Cell[];
  'context': KeysideData;
}
