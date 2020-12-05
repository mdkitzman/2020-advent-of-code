import { assert } from 'console';
import { promises as fs } from 'fs';
import { difference } from 'lodash';
import { max } from '../util';

const binSearch = (input:string, max:number):number => {
  let [low, high] = [0, max];
  input.split('').forEach(ch => {
    const mid = (low + high)/2;
    switch(ch) {
      case 'F':
      case 'L':
        high = Math.floor(mid);
        break;
      case 'B':
      case 'R':
        low = Math.ceil(mid);
        break;
    }
  });
  assert(low === high);
  return low;
};

const seatIds = (input:string) => input.split('\n')
  .map(boardingPass => {
    const rowSearch = boardingPass.substr(0, 7);
    const colSearch = boardingPass.substr(7, 3);

    const row = binSearch(rowSearch, 127);
    const col = binSearch(colSearch, 7);

    const seatID = (row * 8) + col;
    return seatID;
  });

const part1 = (input:string) => {
  const maxSeat = seatIds(input).reduce(max, 0);  

  console.log(`Part 1 : maxSeat id is ${maxSeat}`);
};

const part2 = (input:string) => {
  const ids = seatIds(input);
  const diff = difference([...Array(128*8).keys()], ids)
    .filter(num => num >= 128) 
    .filter(num => num < (128 * 8 - 128));

  console.log(`Part 2 : My seat id is ${diff[0]}`)
}

(async () => {
  const allInput = await fs.readFile('./days/5/input', { encoding: 'utf-8'});
  const test = await fs.readFile('./days/5/test', { encoding: 'utf-8'});

  part1(allInput); // 965
  part2(allInput); // 524
})();