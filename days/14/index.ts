import { promises as fs } from 'fs';
import { sum } from '../util/arrayUtils';
import { leftpad } from '../util/stringUtils';

const part1 = (input:string) => {

  let mask:string[] = [];
  let memory:{[k:number]:number} = {};
  const memInstRegex = /mem\[(\d+)\] = (\d+)/;

  input.split('\n')
    .forEach(instruction => {
      if(instruction.startsWith('mask')) {
        mask = instruction.split(' = ')[1].split('');
      } else {
        const [_, memIndexStr, valueStr] = memInstRegex.exec(instruction) || [];
        const memIndex = parseInt(memIndexStr, 10);
        const value = parseInt(valueStr, 10);
        const strValueBin = leftpad(value.toString(2), 36)
          .split('')
          .map((iVal, index) => mask[index] === 'X' ? iVal : mask[index])
          .join('');
        memory[memIndex] = parseInt(strValueBin, 2);
      }
    });
  
  const total = Object.values(memory).reduce(sum, 0);

  console.log(`Part 1 : Sum of memory is ${total}`);
};

const part2 = (input:string) => {
  console.log(`Part 2 : `)
}

(async () => {
  const allInput = await fs.readFile('./days/14/input', { encoding: 'utf-8'});
  const test = await fs.readFile('./days/14/test', { encoding: 'utf-8'});

  part1(allInput); // 9967721333886
  part2(test);
})();