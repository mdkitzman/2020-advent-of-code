export const bitAnd = (prev: number, cur: number) => prev & cur;
export const sum = (prev: number, cur: number) => prev + cur;
export const multiply = (prev: number, cur: number) => prev * cur;
export const allTrue = (prev: boolean, cur:boolean) => prev && cur;
export const anyTrue = (prev: boolean, cur:boolean) => prev || cur;

export const max = (prev: number, cur: number) => Math.max(prev, cur)
export const min = (prev: number, cur: number) => Math.min(prev, cur)

export const toCharCodes = (input:string):number[] => input.split('').map(c => c.charCodeAt(0));