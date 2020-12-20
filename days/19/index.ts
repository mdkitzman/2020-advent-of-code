import { promises as fs } from 'fs';
import nearley from "nearley";

const matchingLineCount = (input:string, grammar) => {
  grammar.ParserStart = "0";
  const validResults = input
  .split('\n')
  .map(line => line.trim())
  .filter(line => {
    try {
        const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
        parser.feed(line).results; 
        console.log(line);
        return true;
      } catch (e) {
        return false;
      }
    })
    .length;
  return validResults;
}

const part1 = (input:string) => {
  const grammar = require("./grammar.js");
  const validResults = matchingLineCount(input.split('\n\n')[1], grammar);
  
  console.log(`Part 1 : There are ${validResults} matching lines`);
};

const part2 = (input:string) => {
  const grammar = require("./test-grammar2.js");
  const validResults = matchingLineCount(input.split('\n\n')[1], grammar);

  console.log(`Part 2 : There are ${validResults} matching lines`)
}

(async () => {
  const allInput = await fs.readFile('./days/19/input', { encoding: 'utf-8'});
  const test = await fs.readFile('./days/19/input2', { encoding: 'utf-8'});

  part1(allInput); // 147
  part2(test); // !274 .. too big
})();