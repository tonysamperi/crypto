import {Hasher} from "../lib/hasher.class.js";
import {WordArray} from "../lib/word-array.class.js";

// Constants
const H: number[] = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];
const W: number[] = new Array(80);

export class SHA1 extends Hasher {
    public _hash!: WordArray;

    public reset(): void {
        super.reset();
        this._hash = new WordArray(H.slice(0));
    }

    _doProcessBlock(M: number[], offset: number): void {
        const Hl = this._hash.words;

        let a = Hl[0];
        let b = Hl[1];
        let c = Hl[2];
        let d = Hl[3];
        let e = Hl[4];

        for (let i = 0; i < 80; i++) {
            if (i < 16) {
                W[i] = M[offset + i] | 0;
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

        Hl[0] = (Hl[0] + a) | 0;
        Hl[1] = (Hl[1] + b) | 0;
        Hl[2] = (Hl[2] + c) | 0;
        Hl[3] = (Hl[3] + d) | 0;
        Hl[4] = (Hl[4] + e) | 0;
    }

    public _doFinalize(): WordArray {
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
}
