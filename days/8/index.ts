import { promises as fs } from 'fs';
import { cloneDeep } from 'lodash';
type instruction = [string, number, number];
enum ExitCode { OK, LOOP };

const execute = (instructions:instruction[]):[ExitCode, number] => {
  const seen = new Set();
  const seenKey = (instruction:instruction):string => `${instruction[2]} - ${instruction[0]}:${instruction[1]}`;
  let iInstruction = 0;
  let accumulator = 0;

  do {
    const instruction = instructions[iInstruction % instructions.length];
    if (seen.has(seenKey(instruction))){
      return [ExitCode.LOOP, accumulator];
    }

    seen.add(seenKey(instruction));
    switch(instruction[0]) {
      case 'acc':
        accumulator += instruction[1];
        iInstruction++;
        break;
      case 'jmp':
        iInstruction += instruction[1];
        break;
      case 'nop':
      default:
        iInstruction++;
        break;
    }
    if(iInstruction === instructions.length)
      return [ExitCode.OK, accumulator];

  } while(true);
}

const part1 = (input:string) => {
  
  const instructions:instruction[] = input.split('\n').map(line => line.split(' ')).map(([opp, num], index) => [opp, parseInt(num, 10), index]);
  const [_, accumulator] = execute(instructions);

  console.log(`Part 1 : Accumulator is ${accumulator} before repeating`);
};

const part2 = (input:string) => {
  const instructions:instruction[] = input.split('\n').map(line => line.split(' ')).map(([opp, num], index) => [opp, parseInt(num, 10), index]);
  const numInstructions = instructions.length;

  let accumulator:number = 0;
  for(let iInstruction = 0; iInstruction < numInstructions; iInstruction++) {
    if(instructions[iInstruction][0] === 'acc')
      continue;
    const copy = cloneDeep(instructions);
    copy[iInstruction][0] = copy[iInstruction][0] === 'jmp' ? 'nop' : 'jmp';
    let [exit, acc] = execute(copy);
    if(exit === ExitCode.OK){
      accumulator = acc;
      break;
    }
  }
  console.log(`Part 2 : Accumulator is ${accumulator}`);
}

(async () => {
  const allInput = await fs.readFile('./days/8/input', { encoding: 'utf-8'});
  const test = await fs.readFile('./days/8/test', { encoding: 'utf-8'});

  part1(allInput); // 1137
  part2(allInput); // 1125
})();