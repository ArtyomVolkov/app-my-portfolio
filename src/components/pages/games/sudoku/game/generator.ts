export enum Level {
  Easy = 62,
  Medium = 53,
  Hard = 44
}

class SudokuGenerator {
  private static size: number = 9;

  private matrix: Array<Array<number>> = [
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

  generate = (level: Level) => {
    this.shuffle();
    const blocks = this.transform();

    return {
      filled: blocks,
      blank: []
    };
  }

  private shuffle = () => {
    const crypt = {};
    const list = Array(SudokuGenerator.size).fill(1).map((item, index) => index+1);

    Array(SudokuGenerator.size).fill(1).forEach((item, index) => {
      const randomIndex = Math.round(Math.random()*(list.length-1));

      crypt[index+1] = list[randomIndex];
      list.splice(randomIndex, 1);
    });

    this.matrix = this.matrix.map((block) => block.map((item) => crypt[item]));
  }

  private transform = (): Array<Array<number>> => {
    const blocks = [];
    const size = Math.sqrt(SudokuGenerator.size);
    const row = Array(size).fill(1).map((item, index) => index*size);

    row.forEach((a) => {
      row.forEach((b) => {
        const block = [];

        row.forEach((item, i) => {
          row.forEach((item, j) => {
            block.push(this.matrix[a+i][b+j]);
          });
        });
        blocks.push(block);
      });
    });

    return blocks;
  }
}

export default SudokuGenerator;
