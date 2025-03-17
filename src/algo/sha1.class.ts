import {Hasher} from "../lib/hasher.class.js";
import {WordArray} from "../lib/word-array.class.js";

// Constants
// eslint-disable-next-line @typescript-eslint/naming-convention
const H: number[] = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];
// eslint-disable-next-line @typescript-eslint/naming-convention
const W: number[] = new Array(80);

export class SHA1 extends Hasher {

    get hash(): WordArray {
        return this._hash;
    }

    protected _hash: WordArray;

    reset(): void {
        super.reset();
        this._hash = new WordArray(H.slice(0));
    }

    protected _doFinalize(): WordArray {
        const nBitsTotal = this._nDataBytes * 8;
        const nBitsLeft = this._data.sigBytes * 8;

        // Padding
        this._data.words[nBitsLeft >>> 5] |= 0x80 << (24 - (nBitsLeft % 32));
        this._data.words[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
        this._data.words[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
        this._data.sigBytes = this._data.words.length * 4;

        // Process final blocks
        this._process();

        return this._hash;
    }

    protected _doProcessBlock(m: number[], offset: number): void {

        let a = this._hash.words[0];
        let b = this._hash.words[1];
        let c = this._hash.words[2];
        let d = this._hash.words[3];
        let e = this._hash.words[4];

        for (let i = 0; i < 80; i++) {
            if (i < 16) {
                W[i] = m[offset + i] | 0;
            }
            else {
                const n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
                W[i] = (n << 1) | (n >>> 31);
            }

            let f, k;
            if (i < 20) {
                f = (b & c) | (~b & d);
                k = 0x5a827999;
            }
            else if (i < 40) {
                f = b ^ c ^ d;
                k = 0x6ed9eba1;
            }
            else if (i < 60) {
                f = (b & c) | (b & d) | (c & d);
                k = 0x8f1bbcdc;
            }
            else {
                f = b ^ c ^ d;
                k = 0xca62c1d6;
            }

            const temp = ((a << 5) | (a >>> 27)) + f + e + k + W[i];
            e = d;
            d = c;
            c = (b << 30) | (b >>> 2);
            b = a;
            a = temp | 0;
        }

        this._hash.words[0] = (this._hash.words[0] + a) | 0;
        this._hash.words[1] = (this._hash.words[1] + b) | 0;
        this._hash.words[2] = (this._hash.words[2] + c) | 0;
        this._hash.words[3] = (this._hash.words[3] + d) | 0;
        this._hash.words[4] = (this._hash.words[4] + e) | 0;
    }

}
