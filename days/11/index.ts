import { promises as fs } from 'fs';
import { inRange } from 'lodash';

enum Item {
  floor = '.',
  empty = 'L',
  occupied = '#'
}

const seatGrid = (input:string): Item[][] => {
  return input.split('\n')
    .map(line => line.split('')
      .map(ch => {
        switch (ch) {
          case 'L': return Item.empty;
          case '#': return Item.occupied;
          default:
          case '.': return Item.floor;
        }
      }))
};

type SeatSeeker = (grid:Item[][], row:number, col:number) => number;

const fillSeats = (grid:Item[][], seatFinder:SeatSeeker, occupiedTolerance:number):number => {
  let changed:boolean;
  do {
    changed = false;
    grid = grid
      .map((row, iRow) => 
        row.map((item, iCol) => {
          const occupiedCount = seatFinder(grid, iRow, iCol);
          switch(item) {
            case Item.empty:
              if (occupiedCount === 0) {
                changed = true;
                return Item.occupied;
              }
              return Item.empty
            case Item.occupied:
              if (occupiedCount >= occupiedTolerance){
                changed = true;
                return Item.empty;
              }
              return Item.occupied;
            case Item.floor:
            default:
              return Item.floor;
          }
        })
      );
  } while (changed);

  const occupiedSeats = grid.flat().filter(item => item === Item.occupied).length;
  return occupiedSeats;
}

const adjacentWindow = [
  [-1, -1], [0, -1], [+1, -1],
  [-1,  0],          [+1,  0],
  [-1, +1], [0, +1], [+1, +1],
]

const print = (grid:Item[][]):string => {
  return grid.map(row => row.join('')).join('\n');
};

const inGrid = (width:number, height:number) => (row:number, col:number) => inRange(row, 0, height) && inRange(col, 0, width);

const part1 = (input:string) => {
  let grid = seatGrid(input);
  const width = grid[0].length;
  const height = grid.length;
  const isValid = inGrid(width, height);  

  const visibleSeats = (grid:Item[][], iRow:number, iCol:number) => adjacentWindow
    .map(([dCol, dRow]) => [iCol + dCol, iRow + dRow])
    .filter(([col, row]) => isValid(row, col))
    .map(([col, row]) => grid[row][col])
    .filter(i => i === Item.occupied)
    .length;

  const occupiedSeats = fillSeats(grid, visibleSeats, 4);

  console.log(`Part 1 : found ${occupiedSeats} occupied seats`);
};

const part2 = (input:string) => {
  let grid = seatGrid(input);
  const width = grid[0].length;
  const height = grid.length;
  const isValid = inGrid(width, height);

  const addPoints = (row1:number, col1:number, row2:number, col2:number):number[] => [row1 + row2, col1 + col2];

  const visibleSeats = (grid:Item[][], iRow:number, iCol:number):number => adjacentWindow
    .map(([dCol, dRow]) => {
      let [row, col] = addPoints(iRow, iCol, dRow, dCol);
      while (true) {
        if(!isValid(row, col)) {
          return Item.floor; // we went out of bounds, this will be filtered out
        }
        if(grid[row][col] !== Item.floor)
          break;
        [row, col] = addPoints(row, col, dRow, dCol);
      }
      return grid[row][col];
    })
    .filter(item => item === Item.occupied)
    .length

  const occupiedSeats = fillSeats(grid, visibleSeats, 5);

  console.log(`Part 2 : found ${occupiedSeats} occupied seats`);
}

(async () => {
  const allInput = await fs.readFile('./days/11/input', { encoding: 'utf-8'});
  const test = await fs.readFile('./days/11/test', { encoding: 'utf-8'});

  part1(allInput); // 2334
  part2(allInput); // 2100
})();