import { promises as fs } from 'fs';
import { multiply, sum } from '../util/arrayUtils';
import infixToPostfix from 'infix-to-postfix';
import rpn from 'rpn';

const part1 = (input:string) => {  
  const evaluate = (input:string):number => {
    return rpn(infixToPostfix(input));
  }

  const total = input.split('\n').map(evaluate).reduce(sum)

  console.log(`Part 1 : The sum of values is ${total}`);
};

const part2 = (input:string) => {
  
  const reduce = (part:(number|string)[]) => {
    const sums:number[] = [part[0] as number];
    for (let i = 1; i < part.length; i += 2) {
      const sign = part[i];
      const val:number = part[i + 1] as number;

      if(sign === '+') {
        sums[0] += val
      } else {
        sums.unshift(val);
      }
    }
    return sums.reduce(multiply);
  }
  
  const wrapAddition = (line:string) =>{
    // Parse numbers, leave all other tokens as strings
    let tokens:(number|string)[] = line
      .replace(/\(/g, '( ')
      .replace(/\)/g, ' )')
      .split(' ')
      .map(token => parseInt(token, 10) || token);;
  
    // Resolve all parens first
    while (tokens.includes(')')) {
      let close_paren = tokens.indexOf(')');
      let open_paren = tokens.lastIndexOf('(', close_paren);
  
      let slice = tokens.slice(open_paren + 1, close_paren);
      const slice_length = slice.length;
      
      let total = reduce(slice);
      
      // The `+ 2` is for the parens we removed in the slice
      tokens.splice(open_paren, slice_length + 2, total);
    }
  
    let total = reduce(tokens);
    return total;
  }

  const total = input.split('\n').map(wrapAddition).reduce(sum);

  console.log(`Part 2 :The sum of values is ${total}`)
}

(async () => {
  const allInput = await fs.readFile('./days/18/input', { encoding: 'utf-8'});
  const test = await fs.readFile('./days/18/test', { encoding: 'utf-8'});

  part1(allInput); // 9535936849815
  part2(allInput); // 472171581333710
})();