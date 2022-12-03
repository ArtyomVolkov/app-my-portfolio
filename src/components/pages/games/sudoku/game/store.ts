import { makeAutoObservable } from 'mobx';
import cloneDeep from 'lodash/cloneDeep';

import SudokuGenerator, { Level } from '@pages/games/sudoku/game/generator';
import { ModalType } from '@pages/games/sudoku/game/modal';

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
  active: [block: number, cell: number],
  history: Array<{ block: number, cell: number, value: number }>,
  modal: { open: boolean, type: ModalType, onConfirm?: () => void},
  setNewGame: (level: Level) => void,
  setActive: (data) => void,
  setModal: (data) => void,
  fill: () => void,
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
  active: [block: number, cell: number];
  history: Array<{ block: number; cell: number; value: number }>;
  modal: { open: boolean; type: ModalType; onConfirm?: () => void };

  constructor(level: Level) {
    makeAutoObservable(this);

    this.level = level;
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

  onChangeLevel(level): void {
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
    const data = SudokuGenerator.setHint(this.matrix.blank, this.matrix.filled);

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

  setActive(active): void {
    this.active = active;
  }

  setModal(data): void {
    this.modal = data;
  }

  setNewGame(level): void {
    const sudoku = this.generator.generate(level);

    this.resetData();
    this.level = level;
    this.matrix = {
      filled: sudoku.filled,
      blank: cloneDeep(sudoku.blank),
      data: sudoku.blank
    }
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
      onConfirm: null,
    });
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