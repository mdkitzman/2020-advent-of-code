import { promises as fs } from 'fs';
import { sum, anyTrue } from '../util/arrayUtils';
interface Contents {
  [bagColor:string]:number
}
const bagMatcher = /^([a-z]+ [a-z]+) bags contain /;
const containsMatcher = /(\d+) ([a-z]+ [a-z]+) bag/gm
type InputLine = { color:string, contents:Contents};

const parseInput = (input:string): InputLine[] => 
  input.split('\n')
  .map(line => {
    const [_, color ] = bagMatcher.exec(line)  || [];
    let vals;
    const contents:Contents = {};
    while ((vals = containsMatcher.exec(line)) !== null) {
      const [_, numStr, color] = vals;
      contents[color] = parseInt(numStr, 10);
    } 
    return {color, contents};
  });

const part1 = (input:string) => {
  const bags = parseInput(input);
  const needle = "shiny gold";
  
  const find = (color:string):boolean => {
    if(color === needle)
      return true;
    const bag = bags.find((value) => value.color === color)!;
    const found = Object.entries(bag.contents)
      .map(([bagColor, _]) => find(bagColor))
      .reduce(anyTrue, false);
    return found;
  }
  
  const num = bags
    .filter(line => line.color !== needle)
    .map(line => find(line.color) ? 1 : 0)
    .reduce(sum, 0);

  console.log(`Part 1 : found ${num} bags that can contain a "${needle}" bag`);
};

const part2 = (input:string) => {
  const bags = parseInput(input);
  
  const countBags = (color:string):number => {
    const bag = bags.find((value) => value.color === color)!;
    const found = Object.entries(bag.contents)
      .map(([bagColor, numBags]) => countBags(bagColor) * numBags)
      .reduce(sum, 1);
    return found;
  }
  const num = countBags("shiny gold") - 1;

  console.log(`Part 2 : found ${num} bags in a "shiny gold" bag`);
}

(async () => {
  const allInput = await fs.readFile('./days/7/input', { encoding: 'utf-8'});
  const test = await fs.readFile('./days/7/test', { encoding: 'utf-8'});

  part1(allInput); // 119
  part2(allInput); // 155802
})();