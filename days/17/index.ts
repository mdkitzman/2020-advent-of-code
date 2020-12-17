import { promises as fs } from 'fs';
import { ConwaySpace } from './cube';

const pointMapper = (neighborCount:number, isActive:boolean):boolean => {
  if(isActive){
    return (neighborCount === 2 || neighborCount === 3);
  } else {
    return neighborCount === 3;
  }    
}

const part1 = (input:string) => {
  const cube = new ConwaySpace(input, 3);
  for(let i = 0; i < 6; i++) {
    cube.cycle(pointMapper);
  }
  
  console.log(`Part 1 : There are ${cube.activeCount} cubes`);
};

const part2 = (input:string) => {
  const cube = new ConwaySpace(input, 4);
  for(let i = 0; i < 6; i++) {
    cube.cycle(pointMapper);
  }

  console.log(`Part 2 : There are ${cube.activeCount} cubes`)
}

(async () => {
  const allInput = await fs.readFile('./days/17/input', { encoding: 'utf-8'});
  const test = await fs.readFile('./days/17/test', { encoding: 'utf-8'});

  part1(allInput); // 375
  part2(allInput); // 2192
})();