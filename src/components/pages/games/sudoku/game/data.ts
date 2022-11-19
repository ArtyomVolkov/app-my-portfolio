import { Languages, Technologies } from '@shared/dtos/develop';

import { Level } from '../game';

export const TECHNOLOGIES = [
  Languages.typescript,
  Technologies.materialUI,
  Technologies.css,
];

export const GAME_DATA: {
  [key in Level]: {
    filled: Array<Array<number>>,
    blank: Array<Array<number>>,
  }
} = {
  easy: {
    filled: [
      [7,6,1,9,3,2,5,8,4], [9,8,5,4,7,6,1,2,3], [2,3,4,8,5,1,6,9,7],
      [3,4,9,2,1,7,8,5,6], [6,1,8,5,3,4,2,9,7], [7,2,5,9,8,6,1,4,3],
      [1,7,8,6,9,3,4,2,5], [3,5,2,8,4,1,7,6,9], [4,6,9,5,7,2,3,1,8]
    ],
    blank: [
      [7,0,0,0,0,2,0,0,4], [9,8,5,4,0,0,0,0,3], [0,0,4,0,0,0,6,9,0],
      [3,0,9,2,0,0,8,5,0], [6,0,8,0,0,0,2,0,7], [0,2,5,0,0,6,1,0,3],
      [0,7,8,0,0,0,4,0,0], [3,0,0,0,0,1,7,6,9], [4,0,0,5,0,0,0,0,8]
    ]
  },
  medium: {
    filled: [],
    blank: [],
  },
  hard: {
    filled: [],
    blank: [],
  }
};
