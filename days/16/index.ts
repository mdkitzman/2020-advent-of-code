import { promises as fs } from 'fs';
import { isEmpty } from 'lodash';
import { allTrue, anyTrue, multiply, sum } from '../util/arrayUtils';
import { inRange } from './../util/numberUtils';

type Field = {
  name:string;
  valueValid:(val:number)=>boolean;
};

const parseInput = (input:string):{fields:Field[], tickets:number[][]} => {
  const lines = input.split('\n\n');
  const fields:Field[] = lines[0].split('\n')
    .map(line => /([a-zA-Z ]+): (\d+)-(\d+) or (\d+)-(\d+)/.exec(line) || [])
    .map(matches => {
      const rangesValidators:((val:number)=>boolean)[] = [
        inRange(parseInt(matches[2], 10), parseInt(matches[3], 10)),
        inRange(parseInt(matches[4], 10), parseInt(matches[5], 10)),
      ];
      return {
        name:matches[1],
        valueValid:(value:number):boolean => rangesValidators.some(validator => validator(value)),
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
    fields,
    tickets
  }
}

const invalidValues = (fields:Field[], ticket:number[]):number[] => ticket.filter(ticketValue => !fields.some(c => c.valueValid(ticketValue)));
const ticketInvalid = (fields:Field[], ticket:number[]):boolean => invalidValues(fields, ticket).length > 0

const part1 = (input:string) => {
  const { fields, tickets } = parseInput(input);
  
  const invalidvalues = tickets.filter((_, index) => index > 0)
    .filter(ticket => ticketInvalid(fields, ticket))
    .map(ticket => invalidValues(fields, ticket))
    .flat();

  console.log(`Part 1 : Error rate is ${invalidvalues.reduce(sum, 0)}`);
};

const part2 = (input:string) => {

  const { fields, tickets } = parseInput(input);
  const validTickets = tickets.filter(ticket => !ticketInvalid(fields, ticket));

  // Find all of the fields that that satisfy the rule for all tickets
  const fieldmap = fields
    .map(field => {
      const possibleCols:number[] = [];      
      for(let iCol = 0; iCol < fields.length; iCol++) {
        const found = validTickets
          .map(ticket => ticket[iCol])
          .map(value => field.valueValid(value))
          .reduce(allTrue);
        if (found){
          possibleCols.push(iCol);
        }
      }
      return { [field.name]:possibleCols };
    })
    .reduce((prev, cur) => ({ ...prev, ...cur }), {});

  // There should be 1 column that has 1 entry, and one with 2, etc.
  // Use the process of elimination to get a single column per rule
  let reducedFieldMap:{[k:string]:number} = {};
  while(!isEmpty(fieldmap)) {
    const entryKey = Object.keys(fieldmap).filter(key => fieldmap[key].length === 1)[0];
    const column = fieldmap[entryKey][0];
    reducedFieldMap[entryKey] = column;
    Object.values(fieldmap).forEach(fields => fields.splice(fields.indexOf(column), 1));
    delete fieldmap[entryKey];   
  }
  
  const myTicket = tickets[0];
  const departureValues = Object.entries(reducedFieldMap)
    .filter(([fieldName, _]) => fieldName.startsWith("departure"))
    .map(([_, column]) => myTicket[column]);

  console.log(`Part 2 : The result is ${departureValues.reduce(multiply)}`);
}

(async () => {
  const allInput = await fs.readFile('./days/16/input', { encoding: 'utf-8'});
  const test = await fs.readFile('./days/16/test', { encoding: 'utf-8'});

  part1(allInput); // 21980
  part2(allInput); // 1439429522627
})();