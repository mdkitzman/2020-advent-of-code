import { promises as fs } from 'fs';
import { sum, multiply } from '../util';

const treeCount = (input:string, slope:{x:number,y:number}):number => {
  return input.split('\n')
    .filter((_, row) => row % slope.y === 0)
    .map((line, row) => {
      const colIndex = (slope.x * row) % line.length;
      return line[colIndex] === '#' ? 1 : 0;
    })
    .reduce(sum, 0);
}

const part1 = (input:string) => {
  const trees = treeCount(input, {x:3, y:1});
  
  console.log(`Part 1 : We hit ${trees} trees`);
};

const part2 = (input:string) => {
  const slopes = [
    {x:1, y:1},
    {x:3, y:1},
    {x:5, y:1},
    {x:7, y:1},
    {x:1, y:2},
  ];
  const mult = slopes.map(slope => treeCount(input, slope)).reduce(multiply, 1);
  console.log(`Part 2 : multiplying the tree counts for multiple slopes is ${mult}`)
}

(async () => {
  const allInput = await fs.readFile('./days/3/input', { encoding: 'utf-8'});
  const test = await fs.readFile('./days/3/test', { encoding: 'utf-8'});

  part1(allInput); // 209
  part2(allInput); // 1574890240
})();