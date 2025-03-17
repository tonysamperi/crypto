import {Hex} from "../enc/hex.class.js";

export class WordArray {

    sigBytes: number;
    words: number[];

    /**
     * Initializes a newly created word array.
     *
     * @param words (Optional) An array of 32-bit words.
     * @param sigBytes (Optional) The number of significant bytes in the words.
     *
     * @example
     *
     *     let wordArray = new WordArray();
     *     let wordArray = new WordArray([0x00010203, 0x04050607]);
     *     let wordArray = new WordArray([0x00010203, 0x04050607], 6);
     */
    constructor(words?: number[], sigBytes?: number) {
        this.words = words || [];

        if (sigBytes !== undefined) {
            this.sigBytes = sigBytes;
        }
        else {
            this.sigBytes = this.words.length * 4;
        }
    }

    /**
     * Creates a word array filled with random bytes.
     *
     * @param nBytes The number of random bytes to generate.
     *
     * @return The random word array.
     *
     * @example
     *
     *     let wordArray = WordArray.random(16);
     */
    static random(nBytes: number) {
        const words = [];

        const r = (function (mw: number) {
            let mz = 0x3ade68b1;

            const mask = 0xffffffff;

            return function () {
                mz = (0x9069 * (mz & 0xFFFF) + (mz >> 0x10)) & mask;
                mw = (0x4650 * (mw & 0xFFFF) + (mw >> 0x10)) & mask;
                let result = ((mz << 0x10) + mw) & mask;
                result /= 0x100000000;
                result += 0.5;
                return result * (Math.random() > .5 ? 1 : -1);
            };
        });

        for (let i = 0, rcache; i < nBytes; i += 4) {
            const rnd1 = r((rcache || Math.random()) * 0x100000000);

            rcache = rnd1() * 0x3ade67b7;
            words.push((rnd1() * 0x100000000) | 0);
        }

        return new WordArray(words, nBytes);
    }

    /**
     * Removes insignificant bits.
     *
     * @example
     *
     *     wordArray.clamp();
     */
    clamp() {
        // Clamp
        this.words[this.sigBytes >>> 2] &= 0xffffffff << (32 - (this.sigBytes % 4) * 8);
        this.words.length = Math.ceil(this.sigBytes / 4);
    }

    /**
     * Creates a copy of this word array.
     *
     * @return The clone.
     *
     * @example
     *
     *     let clone = wordArray.clone();
     */
    clone(): WordArray {
        return new WordArray(this.words.slice(0), this.sigBytes);
    }


    /**
     * Concatenates a word array to this word array.
     *
     * @param wordArray The word array to append.
     *
     * @return This word array.
     *
     * @example
     *
     *     wordArray1.concat(wordArray2);
     */
    concat(wordArray: WordArray): WordArray {
        // Clamp excess bits
        this.clamp();

        // Concat
        if (this.sigBytes % 4) {
            // Copy one byte at a time
            for (let i = 0; i < wordArray.sigBytes; i++) {
                const thatByte = (wordArray.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
                this.words[(this.sigBytes + i) >>> 2] |= thatByte << (24 - ((this.sigBytes + i) % 4) * 8);
            }
        }
        else {
            // Copy one word at a time
            for (let i = 0; i < wordArray.sigBytes; i += 4) {
                this.words[(this.sigBytes + i) >>> 2] = wordArray.words[i >>> 2];
            }
        }
        this.sigBytes += wordArray.sigBytes;

        // Chainable
        return this;
    }

    /**
     * Converts this word array to a string.
     *
     * @param encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
     *
     * @return The stringified word array.
     *
     * @example
     *
     *     let string = wordArray + '';
     *     let string = wordArray.toString();
     *     let string = wordArray.toString(CryptoJS.enc.Utf8);
     */
    toString<T extends { stringify: (arg: WordArray) => string }>(encoder?: T): string {
        return (encoder || Hex).stringify(this);
    }
}
