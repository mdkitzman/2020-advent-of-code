import { promises as fs } from 'fs';
import { anyTrue, sum } from '../util/arrayUtils';

const hasSum = (haystack:number[], needle:number):boolean => 
  haystack.map(num => haystack.indexOf(needle - num) > -1).reduce(anyTrue, false);

const invalidNum = (numbers:number[], preamble:number):[number, number] => {
  let iNeedle = preamble;
  
  while(true) {
    const haystack = numbers.slice(iNeedle - preamble, iNeedle);
    if(!hasSum(haystack, numbers[iNeedle]))
      break;
    iNeedle++;
  }
  return [iNeedle, numbers[iNeedle]];
}

const part1 = (input:string, preamble:number) => {
  const numbers = input.split('\n').map(num => parseInt(num, 10));
  const [iNeedle] = invalidNum(numbers, preamble);
  
  console.log(`Part 1 : The first number that fails is ${numbers[iNeedle]}`);
};

const part2 = (input:string, preamble:number) => {
  const numbers = input.split('\n').map(num => parseInt(num, 10));
  const [iNeedle, invalidValue] = invalidNum(numbers, preamble);

  const considerations = numbers.splice(0, iNeedle);
  let sumRange:number|undefined;
  for(let windowSize = 2; sumRange == undefined && windowSize < considerations.length; windowSize++) {
    for(let iWindow = 0; sumRange == undefined && iWindow + windowSize < considerations.length; iWindow++) {
      const window = considerations.slice(iWindow, iWindow +windowSize);
      const total = window.reduce(sum, 0);
      if(total === invalidValue) {
        sumRange = Math.min(...window) + Math.max(...window);
      }
    }
  }

  console.log(`Part 2 : The sum of the range is ${sumRange}`)
}

(async () => {
  const allInput = await fs.readFile('./days/9/input', { encoding: 'utf-8'});
  const test = await fs.readFile('./days/9/test', { encoding: 'utf-8'});

  part1(allInput, 25); // 3199139634
  part2(allInput, 25); // 438559930
})();