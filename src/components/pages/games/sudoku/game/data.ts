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
      [1,2,3,4,0,6,7,8,9], [1,0,3,4,5,6,0,8,9], [1,2,0,4,5,0,7,8,9],
      [1,0,3,4,5,0,7,8,9], [0,2,3,4,5,6,7,0,9], [1,2,0,0,0,6,0,8,9],
      [1,2,3,0,0,6,0,8,9], [1,2,3,4,5,6,7,8,9], [1,2,0,4,5,0,7,0,9]
    ],
    blank: [
      [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,0,8,9], [1,2,0,4,5,0,7,8,9],
      [1,0,3,4,5,6,7,8,9], [0,2,3,4,5,6,7,0,9], [1,2,0,0,0,6,0,8,9],
      [1,2,3,4,5,6,7,8,9], [1,2,3,4,5,6,7,8,9], [1,2,0,4,5,0,7,0,9]
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
