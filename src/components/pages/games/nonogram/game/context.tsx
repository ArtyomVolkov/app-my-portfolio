import React, { createContext, useReducer } from 'react';

export enum Action {
  SET_DATA,
  CLEAR_DATA,
  FILL_BOX,
  FILL_BOX_PANEL,
  UPDATE_BLANK,
  SET_FINISH,
  SET_MODAL,
  SET_NEW_GAME
}

export enum EBoxState {
  Cross = -1,
  Empty,
  Filled,
}

export interface IState {
  name: string,
  loading: boolean,
  size: [rows: number, cells: number],
  panel: {
    horizontal: {
      filled: Array<Array<number>>,
      blank: Array<Array<number>>
    },
    vertical: {
      filled: Array<Array<number>>,
      blank: Array<Array<number>>
    }
  },
  matrix: Array<Array<number>>,
  blank: Array<Array<number>>,
  lastActive?: {
    row: number,
    cell: number,
    value: EBoxState,
  },
  modal: {
    open: boolean,
  },
  isFinish: boolean,
}

const State: IState = {
  name: '',
  loading: true,
  size: null,
  panel: {
    horizontal: {
      filled: [],
      blank: []
    },
    vertical: {
      filled: [],
      blank: []
    }
  },
  modal: {
    open: false,
  },
  matrix: [],
  blank: [],
  lastActive: null,
  isFinish: false,
};

const getPanelAreaCells = (list) => {
  const data = [];
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

const getGameData = (data) => {
  const gameData = {
    name: data.name,
    matrix: data.matrix.slice(),
    blank: null,
    size: [data.matrix.length, Math.max(...data.matrix.map((item) => item.length))],
    panel: {
      horizontal: {
        blank: [],
        filled: [],
      },
      vertical: {
        blank: [],
        filled: [],
      }
    }
  };

  data.matrix.forEach((row, i) => {
    const horizontal = getPanelAreaCells(row);
    const vertical = getPanelAreaCells(row.map((cell, j) => data.matrix[j][i]));

    if (horizontal.length) {
      gameData.panel.horizontal.blank.push(horizontal);
      gameData.panel.horizontal.filled.push(horizontal.map(() => null));
    }
    if (vertical.length) {
      gameData.panel.vertical.blank.push(vertical);
      gameData.panel.vertical.filled.push(horizontal.map(() => null));
    }
  });
  gameData.blank = Array(gameData.size[0]).fill(Array(gameData.size[1]).fill(null));
  return gameData;
};

const reducer = (state, action) => {
  switch (action.type) {
    case Action.SET_DATA: {
      return {
        ...state,
        ...action.payload,
        ...getGameData(action.payload),
        loading: false,
      };
    }
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
      }
    }
    case Action.FILL_BOX_PANEL: {
      const { variant, panel } = action.payload;

      return {
        ...state,
        panel: {
          ...state.panel,
          [variant]: panel,
        }
      }
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
        }
      }
    }
    case Action.SET_NEW_GAME: {
      return {
        ...state,
        ...getGameData(action.payload),
        isFinish: false,
        lastActive: null,
        modal: {
          open: false,
        },
      }
    }
    case Action.CLEAR_DATA: {
      return State;
    }
    default:
      return state;
  }
}

export type TDispatch  = (data: { type: Action, payload?: any }) => void;

export const GameContext = createContext(null);

const ContextProvider = ({ children }) => {
  const value = useReducer(reducer, State);

  return (
    <GameContext.Provider value={value}>
      { children }
    </GameContext.Provider>
  );
}

export default ContextProvider;
