import Iter from 'es-iter';
import { allTrue } from '../util/arrayUtils';

const unit = [-1, 0, 1];

const pariwiseAdd = (arr1:number[], arr2:number[]):number[] => {
  return arr1.map((value, index) => value + arr2[index]);
}

export class ConwaySpace {
  private data:Set<string>;
  private dimension:number;
  private unitWindow:number[][];

  constructor(initialValue:string, dimension:number){
    if(dimension < 2){
      throw new Error("This can only exist in 2+ dimensions");
    }
    this.data = new Set();
    this.dimension = dimension;
    this.unitWindow = new Iter(unit)
      .product(...Array(dimension-1).fill(unit))
      .filterFalse((val:number[]) => val.map(v => v === 0).reduce(allTrue))
      .toArray();
    const zeros = Array(dimension - 2).fill(0);
    initialValue.split('\n')
      .forEach((line, x) => line
        .split('')
        .map(ch => ch === '#' )
        .forEach((active, y) => {
          if(active) 
            this.data.add(this.key([x,y,...zeros]))
        })
      );
  }

  cycle(mapper:(neighborCount:number, isActive:boolean)=>boolean) {
    // Look at each active "point", get the points around each one
    // and determine if that point needs to be updated.
    const origin = "0".repeat(this.dimension).split("").map(v => parseInt(v, 10));
    const pointsToConsider = new Set<string>();
    for(const str of this.data) {
      const point = this.unKey(str);
      [origin, ...this.unitWindow]
        .map(deltas => pariwiseAdd(deltas, point))
        .map(point => this.key(point))
        .forEach(pointStr => pointsToConsider.add(pointStr));
    }
    const newCoords:string[] = [];
    pointsToConsider.forEach(pointStr => {
      const point = this.unKey(pointStr);
      const neighborCount = this.unitWindow.filter((delta) => this.active(pariwiseAdd(delta, point))).length;
      const isActive = this.active(point);
      if(mapper(neighborCount, isActive)) {
        newCoords.push(this.key(point));
      }
    });
    this.data = new Set(newCoords);
  }

  private unKey(key:string):number[] {
    return key.split(',').map(v => parseInt(v, 10));
  }

  private key(point:number[]):string {
    return point.join(',');
  }

  private active(point:number[]):boolean {
    return this.data.has(this.key(point));
  }

  get activeCount():number {
    return this.data.size;
  }  
}