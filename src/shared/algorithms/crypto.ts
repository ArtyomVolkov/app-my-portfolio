/*
  text => remove all spaces => grid => text

   example: have a nice day
   => haveaniceday
   => grid: (iteration by column)
        have
        anic
        eday

   => return  hae and via ecy
 */
const gridEncryption = (text: string) => {
  const string = text.replaceAll(' ', '');
  const stringSQRT = Math.sqrt(string.length);
  const [rows, cells] = [Math.round(stringSQRT), Math.ceil(stringSQRT)];
  const grid = [];
  const result: Array<string> = [];

  for (let i = 0; i < string.length;) {
    grid.push(string.slice(i, i + cells));
    i += cells;
  }
  for (let i = 0; i < cells; i++) {
    let word = '';
    for (let j = 0; j < rows; j++) {
      if (grid[j][i]) {
        word += grid[j][i];
      }
    }
    result.push(word);
  }
  return result.join(' ');
}

export default {
  gridEncryption,
};