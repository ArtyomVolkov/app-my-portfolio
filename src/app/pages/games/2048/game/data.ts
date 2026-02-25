import { Languages, Technologies } from '@shared/dtos/develop';

export const TECHNOLOGIES = [
  Languages.typescript,
  Technologies.html,
  Technologies.css,
  Technologies.react,
];

export const KEY_STORE = 'game-2048';
export const CELLS = 4;
export const GRID_SIZE = Math.pow(CELLS, 2);
export const GAME_DATA = new Array(GRID_SIZE).fill(0);
