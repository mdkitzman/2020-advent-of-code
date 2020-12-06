import { promises as fs } from 'fs';
import { bitAnd, sum } from '../util';

const part1 = (input:string) => {
  const count = input.split(/\s\s/g)
    .map(group => 
      new Set(group.split('\n').flat().map(ch => ch.split('')).flat()).size
    ).reduce(sum, 0);
  console.log(`Part 1 : count is ${count}`);
};

const part2 = (input:string) => {
  const _a = 'a'.charCodeAt(0);
  const toBit = (ltr:string):number => 1 << (ltr.charCodeAt(0) - _a);

  const count = input.split(/\s\s/g)
    .map(group => {
      // Map to a bit flag and bitwise and them together
      const num = group.split('\n')
        .map(line => line.split('').map(toBit).reduce(sum, 0))
        .reduce(bitAnd);
      // count the 1s
      const count = num.toString(2).split('')
        .filter(ch => ch === '1')
        .map(ch => parseInt(ch, 10))
        .reduce(sum, 0);
      return count;
    })
    .reduce(sum, 0);

  console.log(`Part 2 : count is ${count}`);
}

(async () => {
  const allInput = await fs.readFile('./days/6/input', { encoding: 'utf-8'});
  const test = await fs.readFile('./days/6/test', { encoding: 'utf-8'});

  part1(allInput); // 6297
  part2(allInput); // 3158
})();