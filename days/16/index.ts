import { promises as fs } from 'fs';
import { isEmpty } from 'lodash';
import { allTrue, anyTrue, multiply, sum } from '../util/arrayUtils';
import { inRange } from './../util/numberUtils';

type Range = [number, number];
type Column = {
  name:string;
  ranges:[Range, Range];
  valueValid:(val:number)=>boolean;
};


const parseInput = (input:string):{columns:Column[], tickets:number[][]} => {
  const lines = input.split('\n\n');
  const columns:Column[] = lines[0].split('\n')
    .map(line => /([a-zA-Z ]+): (\d+)-(\d+) or (\d+)-(\d+)/.exec(line) || [])
    .map(matches => {
      const ranges:[Range, Range] = [
        [parseInt(matches[2], 10), parseInt(matches[3], 10)],
        [parseInt(matches[4], 10), parseInt(matches[5], 10)],
      ];
      return {
        name:matches[1],
        valueValid:(value:number):boolean => {
          return ranges
            .map(range => inRange(range[0], range[1])(value)
          ).reduce(anyTrue);
        },
        ranges,
      };
    });
  
  

  const myTicket = lines[1].split('\n')[1].split(',').map(val=>parseInt(val,10));
  const nearbyTickets = lines[2].split('\n').filter((_, index) => index !== 0)
                          .map(line => line.split(',').map(val => parseInt(val, 10)));
  const tickets:number[][] = [
    myTicket,
    ...nearbyTickets
  ];
  return {
    columns,
    tickets
  }
}

const invalidValues = (columns:Column[], ticket:number[]):number[] => ticket.filter(ticketValue => !columns.map(c => c.valueValid(ticketValue)).reduce(anyTrue));
const ticketInvalid = (columns:Column[], ticket:number[]):boolean => invalidValues(columns, ticket).length > 0

const part1 = (input:string) => {
  const { columns, tickets } = parseInput(input);
  
  const invalidvalues = tickets.filter((_, index) => index > 0)
    .filter(ticket => ticketInvalid(columns, ticket))
    .map(ticket => invalidValues(columns, ticket))
    .flat();

  console.log(`Part 1 : Error rate is ${invalidvalues.reduce(sum, 0)}`);
};

const part2 = (input:string) => {

  const { columns, tickets } = parseInput(input);
  const validTickets = tickets.filter(ticket => !ticketInvalid(columns, ticket));

  // Find all of the columns that that satisfy the rule for all tickets
  const columnMap = columns
    .map(column => {
      const possibleCols:number[] = [];      
      for(let iCol = 0; iCol < columns.length; iCol++) {
        const found = validTickets
          .map(ticket => ticket[iCol])
          .map(value => column.valueValid(value))
          .reduce(allTrue);
        if (found){
          possibleCols.push(iCol);
        }
      }
      return { [column.name]:possibleCols };
    })
    .reduce((prev, cur) => ({ ...prev, ...cur }), {});

  // There should be 1 column that has 1 entry, and one with 2, etc.
  // Use the process of elimination to get a single column per rule
  let reducedColumnMap:{[k:string]:number} = {};
  while(!isEmpty(columnMap)) {
    const entryKey = Object.keys(columnMap).filter(key => columnMap[key].length === 1)[0];
    const column = columnMap[entryKey][0];
    reducedColumnMap[entryKey] = column;
    Object.values(columnMap).forEach(columns => columns.splice(columns.indexOf(column), 1));
    delete columnMap[entryKey];   
  }
  
  const myTicket = tickets[0];
  const departureValues = Object.entries(reducedColumnMap)
    .filter(([key, _]) => key.startsWith("departure"))
    .map(([_, column]) => myTicket[column]);

  console.log(`Part 2 : The result is ${departureValues.reduce(multiply)}`);
}

(async () => {
  const allInput = await fs.readFile('./days/16/input', { encoding: 'utf-8'});
  const test = await fs.readFile('./days/16/test', { encoding: 'utf-8'});

  part1(allInput); // 21980
  part2(allInput); // 1439429522627
})();