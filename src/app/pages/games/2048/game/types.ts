export type Grid = Array<number>;
export const MergeDirection = {
  TOP: 0,
  RIGHT: 1,
  BOTTOM: 2,
  LEFT: 3
} as const;

export type RowDirection = typeof MergeDirection.RIGHT | typeof MergeDirection.LEFT;
export type CellDirection = typeof MergeDirection.TOP | typeof MergeDirection.BOTTOM;