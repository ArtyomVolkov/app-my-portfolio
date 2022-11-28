export enum Level {
  Easy = 39,
  Medium = 32,
  Hard = 25
}

type Matrix = Array<Array<number>>;

class SudokuGenerator {
  private static size: number = 9;

  private readonly matrix: Matrix = [
    [7,6,1, 9,8,5, 2,3,4],
    [9,3,2 ,4,7,6, 8,5,1],
    [5,8,4, 1,2,3 ,6,9,7],

    [3,4,9, 6,1,8, 7,2,5],
    [2,1,7, 5,3,4, 9,8,6],
    [8,5,6, 2,9,7, 1,4,3],

    [1,7,8, 3,5,2, 4,6,9],
    [6,9,3, 8,4,1, 5,7,2],
    [4,2,5, 7,6,9, 3,1,8]
  ];

  static isFinish = (data: Matrix, filled: Matrix): boolean => {
    return !data.some((itemRow, row) =>
      itemRow.some((item, cell) => filled[row][cell] !== item));
  }

  static setHint = (blank: Matrix, filled: Matrix): Matrix => {
    const blocks = [];
    const emptyBlocs = [];
    const data = [...blank];

    blank.forEach((row, index) => {
      const hasEmpty = row.some((item) => !item);

      if (!hasEmpty) {
        blocks[index] = null;
        return;
      }
      emptyBlocs.push(index);
      blocks[index] = row.reduce((prev, item, index) => {
        if (!item) {
          prev.push(index);
        }
        return prev;
      }, []);
    });

    if (!emptyBlocs.length) {
      return null;
    }

    const block = emptyBlocs[Math.round(Math.random() * (emptyBlocs.length-1))];
    const cell = blocks[block][Math.round(Math.random() * (blocks[block].length-1))];

    data[block][cell] = filled[block][cell];
    return data;
  }

  private shuffle = (): Matrix => {
    const crypt = {};
    const matrix = this.matrix.map((item) => item.slice());
    const list = Array(SudokuGenerator.size).fill(1).map((item, index) => index+1);

    Array(SudokuGenerator.size).fill(1).forEach((item, index) => {
      const randomIndex = Math.round(Math.random()*(list.length-1));

      crypt[index+1] = list[randomIndex];
      list.splice(randomIndex, 1);
    });

    return matrix.map((block) => block.map((item) => crypt[item]));
  }

  private getBlocks = (matrix): Matrix => {
    const blocks = [];
    const size = Math.sqrt(SudokuGenerator.size);
    const row = Array(size).fill(1).map((item, index) => index*size);

    row.forEach((a) => {
      row.forEach((b) => {
        const block = [];

        row.forEach((item, i) => {
          row.forEach((item, j) => {
            block.push(matrix[a+i][b+j]);
          });
        });
        blocks.push(block);
      });
    });

    return blocks;
  }

  private reduce = (data, level) => {
    const matrix = data.map((item) => item.slice()); // copy of two dimensional array
    let emptyCells = Math.pow(SudokuGenerator.size, 2) - level;

    do {
      const [block, cell] = [
        Math.round(Math.random()*(SudokuGenerator.size-1)),
        Math.round(Math.random()*(SudokuGenerator.size-1)),
      ];

      if (matrix[block][cell] > 0) {
        matrix[block][cell] = 0;
        emptyCells--;
      }
    } while (emptyCells !== 0);

    return matrix;
  }

  generate = (level: Level) => {
    const matrix = this.shuffle();
    const blocks = this.getBlocks(matrix);

    return {
      filled: blocks,
      blank: this.reduce(blocks, level),
    };
  }
}

export default SudokuGenerator;
