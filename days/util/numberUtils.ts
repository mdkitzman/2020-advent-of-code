import { leftpad } from "./stringUtils";

export const dec2bin = (dec:number, byteSize = 8):string => leftpad((dec >>> 0).toString(2), byteSize);