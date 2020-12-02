import { promises as fs } from 'fs';
import { sum } from '../util';

const getConfigs = (input:string) => {
  const splitter = /([0-9]+)-([0-9]+) ([a-z]): (.+)/;
  const configs = input
    .split('\n')
    .map(line => line.match(splitter))
    .filter(matches => matches !== null)
    .map(matches => ({low: parseInt(matches![1], 10), high:parseInt(matches![2], 10), letter:matches![3], password: matches![4]}))
  return configs;
}

const part1 = (input:string) => {
  const correct = getConfigs(input)
    .map(config => {
      const count = config.password.split('').filter(ch => ch === config.letter).length;
      return (config.low <= count) && (count <= config.high) ? 1 : 0;
    })
    .reduce(sum, 0)
  
  console.log(`Part 1 : ${correct} passwords are correct`);
};

const part2 = (input:string) => {
  const correct = getConfigs(input)
    .map(config => {
      return config.password.split('')
        .filter((_, index) => index+1 === config.low || index+1 === config.high)
        .filter(ch => ch === config.letter)
        .length === 1
        ? 1 : 0;
    })
    .reduce(sum, 0)
  console.log(`Part 2 : ${correct} passwords are correct`)
}

(async () => {
  const allInput = await fs.readFile('./days/2/input', { encoding: 'utf-8'});
  const test = await fs.readFile('./days/2/test', { encoding: 'utf-8'});

  part1(allInput); // 445
  part2(allInput); // 491
})();