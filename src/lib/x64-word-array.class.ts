import {X64Word} from "./x64-word.class.js";
import {WordArray} from "./word-array.class.js";

export class X64WordArray {
    words: X64Word[];
    sigBytes: number;

    constructor(words: X64Word[] = [], sigBytes?: number) {
        this.words = words;
        this.sigBytes = sigBytes !== undefined ? sigBytes : words.length * 8;
    }

    static create(words: X64Word[] = [], sigBytes?: number): X64WordArray {
        return new X64WordArray(words, sigBytes);
    }

    toX32(): WordArray {
        const x32Words: number[] = [];
        for (const word of this.words) {
            x32Words.push(word.high, word.low);
        }

        return new WordArray(x32Words, this.sigBytes);
    }

    clone(): X64WordArray {
        const clonedWords = this.words.map(word => new X64Word(word.high, word.low));

        return new X64WordArray(clonedWords, this.sigBytes);
    }
}
