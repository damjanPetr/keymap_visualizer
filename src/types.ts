export interface LayoutData {
  left: string[][];
  right: string[][];
}

interface Cell {
  key: string;
  value: string;
  desc: string ;
}


interface SideData {

  'left': Cell[];
   'right': Cell[];
}

export interface KeysideData extends SideData {

  'context': Record<string, SideData>;
}
