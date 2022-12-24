import React, { createContext, useReducer } from 'react';

interface IState {
  name: string,
  size: [rows: number, cells: number],
  area: {
    cells: [vertical: number, horizontal: number],
    horizontal: Array<Array<number>>,
    vertical: Array<Array<number>>,
  },
  filled: Array<Array<number>>,
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
};

export enum Action {
  SET_DATA,
  CLEAR_DATA,
  UPDATE_BLANK
}

const reducer = (state, action) => {
  switch (action.type) {
    case Action.SET_DATA: {
      return {
        ...state,
        ...action.payload,
        blank: Array(action.payload.size[0]).fill(Array(action.payload.size[1]).fill(null)),
      };
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
