import React, { createContext, useReducer } from 'react';

import { NONOGRAMS } from './data';
import type { TVariant } from './panel';

const DEFAULT = {
  size: [20, 20],
  panel: [5, 5],
};

export const Action = {
  CLEAR_DATA: 'CLEAR_DATA',
  FILL_BOX: 'FILL_BOX',
  FILL_BOX_PANEL: 'FILL_BOX_PANEL',
  UPDATE_BLANK: 'UPDATE_BLANK',
  SET_FINISH: 'SET_FINISH',
  SET_MODAL: 'SET_MODAL',
  SET_NEW_GAME: 'SET_NEW_GAME',
};

export type TAction = (typeof Action)[keyof typeof Action];

export type JSONObject = {
  [key: string]: string | number | boolean | JSONObject | Array<JSONObject> | null;
};

export type GamePayload = {
  row: number;
  cell: number;
  value: TBoxState;
  variant?: TVariant;
  panel?: {
    blank: Array<Array<number>>;
    filled: Array<Array<TBoxState | null>>;
  };
  isDone?: boolean;
};

export const BoxState = {
  Cross: -1,
  Empty: 0,
  Filled: 1,
};

export type TBoxState = (typeof BoxState)[keyof typeof BoxState];

export type Game = {
  name: string;
  matrix: Array<Array<number>>;
};

export type GameData = {
  name: string;
  matrix: Array<Array<number>>;
  blank: Array<Array<TBoxState | null>> | null;
  size: [rows: number, cells: number];
  panel: {
    horizontal: {
      blank: Array<Array<number>>;
      filled: Array<Array<TBoxState | null>>;
    };
    vertical: {
      blank: Array<Array<number>>;
      filled: Array<Array<TBoxState | null>>;
    };
  };
};

export type IState = {
  name: string;
  loading: boolean;
  size: [rows: number, cells: number] | null;
  panel: {
    horizontal: {
      filled: Array<Array<number>>;
      blank: Array<Array<number>>;
    };
    vertical: {
      filled: Array<Array<number>>;
      blank: Array<Array<number>>;
    };
  };
  matrix: Array<Array<number>>;
  blank: Array<Array<number>>;
  lastActive?: {
    row: number;
    cell: number;
    value: TBoxState;
  } | null;
  modal: {
    open: boolean;
  };
  isFinish: boolean;
}

const State: IState = {
  name: '',
  loading: true,
  size: null,
  panel: {
    horizontal: {
      filled: [],
      blank: [],
    },
    vertical: {
      filled: [],
      blank: [],
    },
  },
  modal: {
    open: false,
  },
  matrix: [],
  blank: [],
  lastActive: null,
  isFinish: false,
};

const getPanelAreaCells = (list: Array<number>): Array<number> => {
  const data: Array<number> = [];
  let count = 0;

  list.forEach((cell, j, list) => {
    if (cell > 0) {
      count++;
    }
    if ((!cell && count > 0) || (j === list.length - 1 && count > 0)) {
      data.push(count);
      count = 0;
    }
  });

  return data;
};

const getGameData = () => {
  const games = Object.keys(NONOGRAMS);
  const name =
    Object.keys(NONOGRAMS)[Math.round(Math.random() * (games.length - 1))];
  const data = NONOGRAMS[name];

  const gameData: GameData = {
    name: data.name || 'unknown',
    matrix: data?.matrix?.slice(),
    blank: null,
    size: [0, 0],
    panel: {
      horizontal: {
        blank: [],
        filled: [],
      },
      vertical: {
        blank: [],
        filled: [],
      },
    },
  };

  data?.matrix.forEach((row) => {
    const cells = getPanelAreaCells(row);

    if (cells.length) {
      gameData.panel.horizontal.blank.push(cells);
      gameData.panel.horizontal.filled.push(cells.map(() => null));
    }
  });
  // for vertical cells (rotate matrix)
  const vertical = data?.matrix?.length || 0;
  const row = Array(vertical).fill(0);

  Array(vertical)
    .fill(0)
    .forEach((_, i) => {
      const cells = getPanelAreaCells(row.map((_, j) => data.matrix[j][i]));

      if (cells.length) {
        gameData.panel.vertical.blank.push(cells);
        gameData.panel.vertical.filled.push(cells.map(() => null));
      }
    });

  if (data?.matrix?.length > 0) {
    gameData.size = [
      data.matrix.length,
      Math.max(...data.matrix.map((item) => item.length)),
    ];
  }

  if (!data?.matrix.length) {
    gameData.size = [DEFAULT.size[0], DEFAULT.size[1]];
    gameData.size[1] = DEFAULT.size[1];
    gameData.panel.horizontal.blank = Array(DEFAULT.size[0]).fill(
      Array(DEFAULT.panel[0]).fill(null)
    );
    gameData.panel.vertical.blank = Array(DEFAULT.size[1]).fill(
      Array(DEFAULT.panel[1]).fill(null)
    );
  }

  gameData.blank = Array(gameData.size[0]).fill(
    Array(gameData.size[1]).fill(null)
  );
  return gameData;
};

const reducer = (state: IState, action: { type: TAction; payload: any }) => {
  switch (action.type) {
    case Action.FILL_BOX: {
      const { row, cell, value } = action.payload;
      const blankData = state.blank.map((item) => item.slice());

      blankData[row][cell] = value;
      return {
        ...state,
        blank: blankData,
        lastActive: {
          row: Number(row),
          cell: Number(cell),
          value,
        },
      };
    }
    case Action.FILL_BOX_PANEL: {
      const { variant, panel } = action.payload;

      return {
        ...state,
        panel: {
          ...state.panel,
          [variant]: panel,
        },
      };
    }
    case Action.UPDATE_BLANK: {
      return {
        ...state,
        blank: action.payload,
      };
    }
    case Action.SET_FINISH: {
      return {
        ...state,
        isFinish: action.payload,
      };
    }
    case Action.SET_MODAL: {
      return {
        ...state,
        modal: {
          open: action.payload,
        },
      };
    }
    case Action.SET_NEW_GAME: {
      return {
        ...state,
        ...getGameData(),
        isFinish: false,
        loading: false,
        lastActive: null,
        modal: {
          open: false,
        },
      };
    }
    case Action.CLEAR_DATA: {
      return State;
    }
    default:
      return state;
  }
};

export type TDispatch = (data: { type: TAction; payload?: GamePayload | boolean | Game | Array<Array<number | null>> }) => void;

export type GameContext = [IState, TDispatch];

export const GameContext = createContext<GameContext >([State, () => null]);
  
const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const value = useReducer<any, any>(reducer, State);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export default ContextProvider;
