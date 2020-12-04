import { promises as fs } from 'fs';
import { difference } from 'lodash';
import { allTrue } from '../util';

const reqFields = ['byr','iyr','eyr','hgt','hcl','ecl','pid'];
const inRange = (min:number, max:number) => (val:number):boolean => min <= val && val <= max;
const yearValidator = (min:number, max:number) => (value:string):boolean => inRange(min, max)(parseInt(value, 10));

const validFieldCount = (passport:string) => {
  const ppFields = passport.split(' ').map(ent => ent.split(':')[0]);
  return difference(reqFields, ppFields).length === 0;
};
const cmInRange = inRange(150, 193);
const inInRange = inRange(59, 76);

const validators:{[k:string]:(v:string)=>boolean} = {
  'byr': yearValidator(1920, 2002),
  'iyr': yearValidator(2010, 2020),
  'eyr': yearValidator(2020, 2030),
  'hgt': (value:string):boolean => { 
    const [_, heightStr, unit] = /^([0-9]+)(cm|in)$/.exec(value) || [];
    if(!heightStr || !unit)
      return false;
    const height = parseInt(heightStr, 10);
    switch(unit) {
      case 'cm': return cmInRange(height);
      case 'in': return inInRange(height);
      default: return false;
    }
   },
  'hcl': (value:string):boolean => /^#[0-9a-f]{6}$/.test(value),
  'ecl': (value:string):boolean => ['amb','blu','brn','gry','grn','hzl','oth'].indexOf(value) !== -1,
  'pid': (value:string):boolean => /^\d{9}$/.test(value),
  'cid': (_:string):boolean => true,
};

const part1 = (input:string) => {
  const validPpassports = input
    .split(/\s\s/).map(line => line.replace(/\n/g, ' '))
    .filter(validFieldCount)
    .length;
  
  console.log(`Part 1 : There are ${validPpassports} valid passports`);
};

const part2 = (input:string) => {
  const validPpassports = input
    .split(/\s\s/).map(line => line.replace(/\n/g, ' '))
    .filter(validFieldCount)
    .filter((passport:string) => {
      return passport.split(' ')
        .map(entry => entry.split(':'))
        .map(([key, value]) => validators[key](value))
        .reduce(allTrue, true);
    })
    .length;

  console.log(`Part 2 : There are ${validPpassports} valid passports`);
}

(async () => {
  const allInput = await fs.readFile('./days/4/input', { encoding: 'utf-8'});
  const test = await fs.readFile('./days/4/test', { encoding: 'utf-8'});

  part1(allInput); // 233
  part2(allInput); // 111
})();