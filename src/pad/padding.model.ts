import {WordArray} from "../lib/word-array.class.js";

export abstract class AbstractPadding {
    static pad: (data: WordArray, blockSize: number) => void;
    static unpad: (data: WordArray) => void;
}

export type Padding = typeof AbstractPadding;
