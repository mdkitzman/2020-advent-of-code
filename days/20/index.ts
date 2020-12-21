import { assert } from 'console';
import { promises as fs } from 'fs';
import { zip } from 'lodash';
import { multiply } from '../util/arrayUtils';

enum Side { TOP, LEFT, BOTTOM, RIGHT };
interface TileNeighbors {
  top?:Tile,
  left?:Tile,
  bottom?:Tile,
  right?:Tile,
}

class Tile {
  private _id:number;
  private _size:number;
  private data:number[][];
  public neighbors:TileNeighbors;

  constructor(input:string){
    const [tileId, ...lines] = input.split('\n');
    this._id = parseInt(/Tile (\d+):/.exec(tileId)![1], 10);
    this._size = lines.length;
    this.data = lines.map(line => line.split('').map(v => parseInt(v, 2)));
    this.neighbors = {}
  }

  rotate() {
    const n = this.data.length;
    const x = Math.floor(n/ 2);
    const y = n - 1;
    for (let i = 0; i < x; i++) {
       for (let j = i; j < y - i; j++) {
          const k = this.data[i][j];
          this.data[i][j] = this.data[y - j][i];
          this.data[y - j][i] = this.data[y - i][y - j];
          this.data[y - i][y - j] = this.data[j][y - i]
          this.data[j][y - i] = k
       }
    }
  }

  transpose() {
    this.data = zip(...this.data) as number[][];
  }

  flipX() {
    this.data.map(row => row.reverse());
  }

  flipY() {
    this.data.reverse();
  }

  get id():number { return this._id; }
  get size():number { return this._size; }

  get left():number {
    return parseInt(this.data.map(row => row[0].toString(2)).join(''), 2);
  }

  get right():number {
    return parseInt(this.data.map(row => row[this._size - 1].toString(2)).join(''), 2);
  }

  get top():number {
    return parseInt(this.data[0].map(b => b.toString(2)).join(''), 2);
  }

  get bottom():number {
    return parseInt(this.data[this._size - 1].map(b => b.toString(2)).join(''), 2);
  }

  getNeighbor(side:Side):Tile|undefined {
    switch(side) {
      case Side.TOP:
        return this.neighbors.top;
      case Side.LEFT:
        return this.neighbors.left;
      case Side.BOTTOM:
        return this.neighbors.bottom;
      case Side.RIGHT:
        return this.neighbors.right;
    }
  }

  getSide(side:Side):number {
    switch(side) {
      case Side.TOP:
        return this.top;
      case Side.LEFT:
        return this.left;
      case Side.BOTTOM:
        return this.bottom;
      case Side.RIGHT:
        return this.right;
    }
  }

  setSide(side:Side, tile:Tile) {
    switch(side) {
      case Side.TOP:
        return this.setTop(tile);
      case Side.LEFT:
        return this.setLeft(tile);
      case Side.BOTTOM:
        return this.setBottom(tile);
      case Side.RIGHT:
        return this.setRight(tile);
    }
  }

  setLeft(tile:Tile, adjacents:boolean = true) {
    assert(this.neighbors.left === undefined);
    assert(tile.neighbors.right === undefined);
    this.neighbors.left = tile;
    tile.neighbors.right = this;
  }

  setRight(tile:Tile, adjacents:boolean = true) {
    assert(this.neighbors.right === undefined);
    assert(tile.neighbors.left === undefined);
    this.neighbors.right = tile;
    tile.neighbors.left = this;
  }

  setBottom(tile:Tile, adjacents:boolean = true) {
    assert(this.neighbors.bottom === undefined);
    assert(tile.neighbors.top === undefined);
    this.neighbors.bottom = tile;
    tile.neighbors.top = this;
  }

  setTop(tile:Tile, adjacents:boolean = true) {
    assert(this.neighbors.top === undefined);
    assert(tile.neighbors.bottom === undefined);
    this.neighbors.top = tile;
    tile.neighbors.bottom = this;
  }

  matches(tile:Tile):Side|undefined {
    if(this.top === tile.bottom) {
      return Side.TOP;
    } else if(this.left === tile.right) {
      return Side.LEFT;
    } else if(this.bottom === tile.top) {
      return Side.BOTTOM;
    } else if(this.right === tile.left) {
      return Side.RIGHT;
    }
  }

  get fullyAssigned():boolean {
    return this.neighbors.left !== undefined 
        && this.neighbors.right !== undefined
        && this.neighbors.top !== undefined 
        && this.neighbors.bottom !== undefined;
  }

  print() {
    console.dir({
      top:this.top,
      bottom:this.bottom,
      left:this.left,
      right:this.right,
    });
    console.log(this.data.map(row => row.map(v => v.toString(2)).join()).join('\n'));
  }
}

const part1 = (input:string) => {
  const tiles:Tile[] = input.replace(/#/g, '1').replace(/\./g, '0').split('\n\n').map(line => new Tile(line))
  const assignedTiles:Tile[] = [tiles.pop()!];

  const checkRotations = (fixedTile:Tile, query:Tile):boolean =>{
    try {
      for(let count = 0; count < 4; count++) {
        let side = fixedTile.matches(query);
        if(side !== undefined) {
          fixedTile.setSide(side, query);
          assignedTiles.push(query);
          return true;
        }
        query.rotate();
      }
    } catch (e) {
      console.log(e);
    }
    return false;
  }

  while (tiles.length > 0) {
    const query = tiles.shift()!;
    let found = false;
    for(const fixedTile of assignedTiles) {
      if(checkRotations(fixedTile, query)) {
        found = true;
        break;
      }
      query.flipX();
      if(checkRotations(fixedTile, query)) {
        found = true;
        break;
      }
      query.flipX()
      query.flipY();
      if(checkRotations(fixedTile, query)) {
        found = true;
        break;
      }
      query.flipY();
    }
    if(!found)
      tiles.push(query);
  }
  
  // Gross way to get these values.
  const [topLeft, topRight, bottomLeft, bottomRight] = [
    assignedTiles.filter(tile1 => assignedTiles.filter(tile2 => tile1.top === tile2.bottom).length === 0 && assignedTiles.filter(tile2 => tile1.left === tile2.right).length === 0),
    assignedTiles.filter(tile1 => assignedTiles.filter(tile2 => tile1.top === tile2.bottom).length === 0 && assignedTiles.filter(tile2 => tile1.right === tile2.left).length === 0),
    assignedTiles.filter(tile1 => assignedTiles.filter(tile2 => tile1.bottom === tile2.top).length === 0 && assignedTiles.filter(tile2 => tile1.left === tile2.right).length === 0),
    assignedTiles.filter(tile1 => assignedTiles.filter(tile2 => tile1.bottom === tile2.top).length === 0 && assignedTiles.filter(tile2 => tile1.right === tile2.left).length === 0),
  ]
  assert(topLeft.length === 1, `Top left has length ${topLeft.length}`);
  assert(topRight.length === 1, `Top right has length ${topRight.length}`);
  assert(bottomLeft.length === 1, `Bottom left has length ${bottomLeft.length}`);
  assert(bottomRight.length === 1, `Bottom rigth has length ${bottomRight.length}`);

  const result = [topLeft, topRight, bottomLeft, bottomRight].map(t => t[0].id).reduce(multiply);
  console.log(`Part 1 : the result is ${result}`);
};

const part2 = (input:string) => {
  console.log(`Part 2 : `)
}

(async () => {
  const allInput = await fs.readFile('./days/20/input', { encoding: 'utf-8'});
  const test = await fs.readFile('./days/20/test', { encoding: 'utf-8'});

  part1(allInput); // 64802175715999
  part2(test);
})();