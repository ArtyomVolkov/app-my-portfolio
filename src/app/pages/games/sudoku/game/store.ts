import { action, makeAutoObservable, observable } from 'mobx';
import cloneDeep from 'lodash/cloneDeep';

import SudokuGenerator, { type Level } from '@pages/games/sudoku/game/generator';
import { ModalType, type ModalType as TModal } from '@pages/games/sudoku/game/modal';

export type RowData = [block: number, cell: number];

interface IMatrix {
  filled: Array<Array<number>>,
  blank: Array<Array<number>>,
  data: Array<Array<number>>,
}

interface ISudoku {
  level: Level,
  matrix: IMatrix,
  hasChange: boolean,
  hints: number,
  active: RowData,
  history: Array<{ block: number, cell: number, value: number }>,
  modal: { open: boolean, type: TModal, onConfirm?: () => void},
  setNewGame: (level: Level) => void,
  setActive: (data: RowData) => void,
  setModal: (data: { open: boolean, type: TModal, onConfirm?: () => void}) => void,
  fill: (value: number) => void,
  hint: () => void,
  undo: () => void,
  onChangeLevel: (level: Level) => void,
}

class SudokuStore implements ISudoku {
  private generator: SudokuGenerator = new SudokuGenerator();

  level: Level;
  matrix: IMatrix;
  hints: number;
  hasChange: boolean;
  active: RowData;
  history: Array<{ block: number; cell: number; value: number }>;
  modal: { open: boolean; type: ModalType; onConfirm?: () => void };

  constructor(level: Level) {
    makeAutoObservable(this, {
      level: observable,
      hints: observable,
      matrix: observable,
      active: observable,
      hasChange: observable,
      modal: observable,
      history: observable,
      setNewGame: action,
      setActive: action,
      setModal: action,
      fill: action,
      hint: action,
      undo: action,
      onChangeLevel: action,
      onStartNewGame: action,
      onCloseModal: action,
    });

    this.hints = 5;
    this.matrix = {
      filled: [],
      blank: [],
      data: []
    }
    this.hasChange = false;
    this.level = level;
    this.active = [-1, -1];
    this.history = [];
    this.modal = {
      open: false,
      type: null,
    }
    this.resetData();
  }

  private resetData = () => {
    this.hasChange = false;
    this.active = [-1, -1];
    this.hints = 5;
    this.history = [];
    this.modal = {
      open: false,
      type: null,
    }
    this.matrix = {
      filled: [],
      blank: [],
      data: []
    }
  }

  private checkIsFinish = () => {
    if (!SudokuGenerator.isFinish(this.matrix.data, this.matrix.filled)) {
      return;
    }
    this.setModal({
      open: true,
      type: ModalType.FINISH,
      onConfirm: () => this.setNewGame(this.level),
    });
  }

  onChangeLevel(level: Level): void {
    if (!this.hasChange) {
      this.setNewGame(level);
      return;
    }
    this.setModal({
      open: true,
      type: ModalType.CONFIRM,
      onConfirm: () => this.setNewGame(level),
    });
  }

  onStartNewGame = () => {
    if (!this.hasChange) {
      this.setNewGame(this.level);
      return;
    }
    this.setModal({
      open: true,
      type: ModalType.CONFIRM,
      onConfirm: () => this.setNewGame(this.level),
    });
  }

  onCloseModal = () => {
    this.setModal({
      open: false,
      type: null,
      onConfirm: undefined,
    });
  }

  fill(value: number = 0): void {
    const [block, cell] = this.active;

    if (block < 0 || cell < 0) {
      return;
    }

    if (!this.hasChange) {
      this.hasChange = true;
    }
    this.matrix.data[block][cell] = value;
    this.history.push({ block, cell, value });

    this.checkIsFinish();
  }

  hint(): void {
    if (this.hints <= 0) {
      return;
    }
    const data = SudokuGenerator.setHint(this.matrix.data, this.matrix.filled);

    if (!data) {
      return;
    }

    if (!this.hasChange) {
      this.hasChange = true;
    }
    this.hints--;
    this.matrix.data = data;

    this.checkIsFinish();
  }

  setActive(active: RowData): void {
    this.active = active;
  }

  setModal(data: { open: boolean, type: ModalType, onConfirm?: (() => void) }): void {
    this.modal = data;
  }

  setNewGame(level: Level): void {
    const sudoku = this.generator.generate(level);

    this.resetData();
    this.level = level;
    this.matrix = {
      filled: sudoku.filled,
      blank: cloneDeep(sudoku.blank),
      data: sudoku.blank
    }
  }

  undo(): void {
    if (!this.history.length) {
      return;
    }
    const lastItem = this.history[this.history.length-1];
    const previousItem = this.history[this.history.length-2];

    this.matrix.data[lastItem.block][lastItem.cell] = 0;

    if (this.history.length > 1) {
      this.matrix.data[previousItem.block][previousItem.cell] = previousItem.value;
    }
    this.history.pop();
  }
}

export default SudokuStore;