import { promises as fs } from 'fs';

const makeIterator = (initialVal:number[]) => {
  const seen:Map<number, number[]> = new Map();
  const seenHandler = {
    get: function(target:Map<number, number[]>, prop:number) {
      if(!target.has(prop)){
        target.set(prop, []);
      } 
      return target.get(prop);
    }
  };
  const safeSeen = new Proxy(seen, seenHandler);
  let lastVal:number|undefined;
  let turn = 1;

  return function* elfNumGen() {
    while (turn <= initialVal.length) {
      lastVal = initialVal[turn-1];
      safeSeen[lastVal].push(turn++);
      yield lastVal;
    }
    while (true) {
      const turnsSeen = safeSeen[lastVal!];
      if(turnsSeen.length === 1) {
        lastVal = 0;
      } else {
        lastVal = turnsSeen[turnsSeen.length - 1] - turnsSeen[turnsSeen.length - 2];
      }
      safeSeen[lastVal].push(turn++);
      yield lastVal;
    }
  }  
}

const part1 = (input:string) => {
  const starters = input.split(',').map(k => parseInt(k, 10));
  const itr = makeIterator(starters);

  let val = 0;
  for(let i = 0; i < 2020; i++){
    val = itr().next().value;
  }
    
  console.log(`Part 1 : The last number spoken was ${val}`);
};

const part2 = (input:string) => {
  const starters = input.split(',').map(k => parseInt(k, 10));
  const itr = makeIterator(starters);
  
  let val = 0;
  for(let i = 0; i < 30_000_000; i++){
    val = itr().next().value;
  }
    
  console.log(`Part 2 : The last number spoken was ${val}`);
}

(async () => {
  const allInput = await fs.readFile('./days/15/input', { encoding: 'utf-8'});
  const test = await fs.readFile('./days/15/test', { encoding: 'utf-8'});

  part1(allInput); // 959
  part2(allInput); // 116590
})();