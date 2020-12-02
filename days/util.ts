import { count } from 'console';
import Graph from 'graphology';
import {bfsFromNode} from 'graphology-traversal'

export const sum = (prev: number, cur: number) => prev + cur;

export const max = (prev: number, cur: number) => Math.max(prev, cur)
export const min = (prev: number, cur: number) => Math.min(prev, cur)

export const leftpad = (str:string, num:number) => ("0".repeat(num) + str).substr(-num);

export const toCharCodes = (input:string):number[] => input.split('').map(c => c.charCodeAt(0));

export const dec2bin = (dec:number, byteSize = 8):string => leftpad((dec >>> 0).toString(2), byteSize);

export const knotNumbers = (lengths:number[], numbers = [...Array(256).keys()], curPos:number = 0, skip:number = 0):[number[], number, number] => {
  // Very much taken from https://www.reddit.com/r/adventofcode/comments/7irzg5/2017_day_10_solutions/
  for (const len of lengths) {
    if (len > 1) {
      numbers = [...numbers.slice(curPos), ...numbers.slice(0, curPos)];    // shift curPos to the beginning of the array.
      numbers = [...numbers.slice(0, len).reverse(), ...numbers.slice(len)];// reverse the requesite length of numbers
      numbers = [...numbers.slice(-curPos), ...numbers.slice(0, -curPos)];  // shift the beginning back to its original curPos
    }
    curPos = (curPos + len + skip++) % 256;
  }

  return [numbers, curPos, skip];
}

export const knotHash = (input:string):string => {
  const bytes:number[] = toCharCodes(input);
  bytes.push(17, 31, 73, 47, 23);

  let numbers: number[] = [...Array(256).keys()]
  let curPos = 0, len = 0;
  for(let iRound = 0; iRound < 64; iRound++) {
    [numbers, curPos, len] = knotNumbers(bytes, numbers, curPos, len);
  }
  
  const hash = [...Array(16).keys()]
    .map(i => numbers.slice(i * 16, i * 16 + 16).reduce((a, b) => a ^ b))
    .map(n => leftpad(n.toString(16), 2))
    .join("")
  return hash;
}

export const subGraphCount = (graph:Graph):number => {
  const visitedNodes = [...graph.nodes()];
  let counter = 0;
  while (visitedNodes.length > 0) {
    const start:string = visitedNodes.shift()!;
    bfsFromNode(graph, start, (node) => {
      const index = visitedNodes.indexOf(node as string);
      if(index >= 0)
        visitedNodes.splice(index, 1);
    });
    counter++;
  }
  return counter;
}