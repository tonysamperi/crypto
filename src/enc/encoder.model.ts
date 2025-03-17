import {WordArray} from "../lib/word-array.class.js";

export abstract class AbstractEncoder {
    static parse: (word: string) => WordArray;
    static stringify: (word: WordArray) => string;
}

export type Encoder = typeof AbstractEncoder;
