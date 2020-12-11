import { promises as fs } from 'fs';
import { multiply, sum } from '../util/arrayUtils';

const part1 = (input:string) => {
  const adapters = input.split('\n').map(line => parseInt(line, 10)).sort((a, b) => a - b);
  
  const diffs = adapters.map((jolt, index, arr) => index > 0 ? jolt - arr[index-1] : jolt)
  diffs.push(3);
  
  const ones = diffs.filter(diff => diff === 1).length;
  const threes = diffs.filter(diff => diff === 3).length;

  console.log(`Part 1 : Found ${ones} one step and ${threes} three step adapters.  Multiplied is ${ones * threes}`);
};

type AdapterSum = {
  adapter:number,
  sum:number
}

const part2 = (input:string) => {
  const adapters = input.split('\n').map(line => parseInt(line, 10)).sort((a, b) => a - b);
  
  const sums:AdapterSum[]  = [{
    adapter:0,
    sum:1
  }];

  // Thanks to mastermatt
  for (const curAdapter of adapters) {
    const prevSums = sums
      // look back three previous adapters
      .slice(-3) 
      // take only entries that have a diff of 3 or less
      .filter((pair) => pair.adapter >= curAdapter - 3) 
      // get the previous sums
      .map(pair => pair.sum);                         
    // sum it up for the current adapter
    sums.push({
      adapter: curAdapter, 
      sum: prevSums.reduce(sum, 0)
    });
  }
  
  const combos = sums.pop()!.sum;
    
  console.log(`Part 2 : Found ${combos} combos`)
}

(async () => {
  const allInput = await fs.readFile('./days/10/input', { encoding: 'utf-8'});
  const test = await fs.readFile('./days/10/test', { encoding: 'utf-8'});

  part1(allInput); // 1755
  part2(allInput); // 4049565169664
})();