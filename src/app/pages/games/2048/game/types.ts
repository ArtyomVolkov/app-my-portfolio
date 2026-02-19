export type Grid = Array<number>;
export enum MergeDirection {
  TOP,
  RIGHT,
  BOTTOM,
  LEFT
}

export type RowDirection = MergeDirection.RIGHT | MergeDirection.LEFT;
export type CellDirection = MergeDirection.TOP | MergeDirection.BOTTOM;