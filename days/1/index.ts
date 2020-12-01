import { promises as fs } from 'fs';

const part1 = (input:string) => {
  const numbers = input.split('\n').map(val => parseInt(val, 10));
  let mult:number|undefined;
  for(let i = 0; mult === undefined && i < numbers.length; i++){
    for(let j = 0; mult === undefined && j < numbers.length; j++) {
      if(numbers[i] + numbers[j] === 2020) {
        mult = numbers[i] * numbers[j];
      }
    }
  }
  console.log(`Part 1 : the value is ${mult}`);
};

const part2 = (input:string) => {
  const numbers = input.split('\n').map(val => parseInt(val, 10));
  let mult:number|undefined;
  for(let i = 0; mult === undefined && i < numbers.length; i++){
    for(let j = 0; mult === undefined && j < numbers.length; j++) {
      for(let k = 0; mult === undefined && k < numbers.length; k++) {
        if(numbers[i] + numbers[j] + numbers[k] === 2020) {
          mult = numbers[i] * numbers[j] * numbers[k];
        }
      }
    }
  }
  console.log(`Part 2 : the value is ${mult}`);
  
}

(async () => {
  const allInput = await fs.readFile('./days/1/input', { encoding: 'utf-8'});
  const test = await fs.readFile('./days/1/test', { encoding: 'utf-8'});

  part1(allInput); // 437931
  part2(allInput); // 157667328
})();