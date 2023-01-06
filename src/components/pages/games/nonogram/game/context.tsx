import React, { createContext, useReducer } from 'react';

export enum Action {
  SET_DATA,
  CLEAR_DATA,
  FILL_BOX,
  UPDATE_BLANK
}

export enum EBoxState {
  Cross = -1,
  Empty,
  Filled,
}

export interface IState {
  name: string,
  size: [rows: number, cells: number],
  area: {
    cells: [vertical: number, horizontal: number],
    horizontal: Array<Array<number>>,
    vertical: Array<Array<number>>,
  },
  filled: Array<Array<number>>,
  blank: Array<Array<number>>,
  lastActive?: {
    row: number,
    cell: number,
    value: EBoxState,
  }
}

const State: IState = {
  name: '',
  size: null,
  area: {
    cells: [0, 0],
    horizontal: [],
    vertical: [],
  },
  filled: [],
  blank: [],
  lastActive: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case Action.SET_DATA: {
      return {
        ...state,
        ...action.payload,
        blank: Array(action.payload.size[0]).fill(Array(action.payload.size[1]).fill(null)),
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
    case Action.UPDATE_BLANK: {
      return {
        ...state,
        blank: action.payload,
      };
    }
    case Action.CLEAR_DATA: {
      return State;
    }
    default:
      return state;
  }
}

export type TDispatch  = (data: { type: Action, payload: any }) => void;

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
