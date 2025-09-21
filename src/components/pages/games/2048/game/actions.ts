import { CellDirection, Grid, MergeDirection, RowDirection } from './types';
import { CELLS, GAME_DATA, GRID_SIZE, KEY_STORE } from './data';

export const saveGameData = (grid: Grid) => {
  window.localStorage.setItem(KEY_STORE, JSON.stringify(grid));
};

export const loadGameData = () => {
  try {
    const data = JSON.parse(window.localStorage.getItem(KEY_STORE));

    if (!data || data.length !== GAME_DATA.length) {
      return null;
    }
    return data;
  } catch (e) {
    return null;
  }
};

export const mergeRow = (data: Grid, direction: RowDirection) => {
  const n = GRID_SIZE - 1;

  for (let i = 0; i < n; i++) {
    let [current, next] = direction === MergeDirection.LEFT ? [i, i + 1] : [n - i, n - i - 1];

    if (!((i + 1) % CELLS) || (!data[current] && !data[next]) || data[current] !== data[next]) {
      continue;
    }
    data[current] = data[current] + data[next];
    data[next] = 0;
  }
};

export const mergeCell = (data: Grid, direction: CellDirection) => {
  for (let i = 0; i < GRID_SIZE; i++) {
    let [current, next] = direction === MergeDirection.TOP ? [i, i + CELLS] : [GRID_SIZE - i, GRID_SIZE - i - CELLS];

    if ((!data[current] && !data[next]) || data[current] !== data[next]) {
      continue;
    }
    data[current] = data[current] + data[next];
    data[next] = 0;
  }
};

export const verticalSwap = (data: Grid, direction: CellDirection) => {
  for (let i = 0; i < CELLS; i++) {
    const cell = [];

    for (let j = 0; j < CELLS; j++) {
      cell[j] = data[i + CELLS * j];
    }
    const filled = cell.filter((item) => item);
    const empty = new Array(CELLS - filled.length).fill(0);
    const merged = direction === MergeDirection.TOP ? filled.concat(empty) : empty.concat(filled);

    for (let k = 0; k < CELLS; k++) {
      data[i + CELLS * k] = merged[k];
    }
  }
};

export const horizontalSwap = (data: Grid, direction: RowDirection) => {
  for (let i = 0; i < GRID_SIZE; i++) {
    if (i % CELLS !== 0) {
      continue;
    }
    const row = [];

    for (let j = 0; j < CELLS; j++) {
      row[j] = data[i + j];
    }
    const filled = row.filter((item) => item);
    const empty = new Array(CELLS - filled.length).fill(0);
    const merged = direction === MergeDirection.RIGHT ? empty.concat(filled) : filled.concat(empty);

    for (let k = 0; k < CELLS; k++) {
      data[i + k] = merged[k];
    }
  }
};

export const getCellIndex = (data: Grid): number => {
  const indexes = [];

  data.forEach((item, index) => {
    if (!item) {
      indexes.push(index);
    }
  });
  if (!indexes.length) {
    return -1;
  }
  return indexes[Math.floor(Math.random() * indexes.length)];
};

export const isGameOver = (data: Grid) => {
  let isOver = true;

  for (let i = 0; i < data.length; i++) {
    if (!data[i]) {
      isOver = false;
      break;
    }
    // row check
    if (((i + 1) % CELLS) && data[i] === data[i + 1]) {
      isOver = false;
      break;
    }
    if (i < CELLS) {
      continue;
    }
    // cell check, up direction
    if (data[i] === data[i - CELLS]) {
      isOver = false;
      break;
    }
  }
  return isOver;
};

export const getScore = (grid: Grid) => {
  return grid.reduce((acc, item) => {
    if ([0, 2].includes(item)) {
      return acc;
    }
    acc += item * (Math.log2(item) - 1);
    return acc;
  }, 0);
};