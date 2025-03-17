import {Hasher} from "../lib/hasher.class.js";
import {WordArray} from "../lib/word-array.class.js";

// Initialization and round constants tables
// eslint-disable-next-line @typescript-eslint/naming-convention
const H: number[] = [];
// eslint-disable-next-line @typescript-eslint/naming-convention
const K: number[] = [];

// Compute constants
(function () {
    function isPrime(n: number) {
        const sqrtN = Math.sqrt(n);
        for (let factor = 2; factor <= sqrtN; factor++) {
            if (!(n % factor)) {
                return false;
            }
        }

        return true;
    }

    function getFractionalBits(n: number) {
        return ((n - (n | 0)) * 0x100000000) | 0;
    }

    let n = 2;
    let nPrime = 0;
    while (nPrime < 64) {
        if (isPrime(n)) {
            if (nPrime < 8) {
                H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
            }
            K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));

            nPrime++;
        }

        n++;
    }
}());

// Reusable object
// eslint-disable-next-line @typescript-eslint/naming-convention
const W: number[] = [];

export class SHA256 extends Hasher {
    private _hash: WordArray;

    constructor() {
        super();
    }

    reset() {
        // reset core values
        super.reset();

        this._hash = new WordArray(H.slice(0));
    }

    protected _doFinalize(): WordArray {
        const nBitsTotal = this._nDataBytes * 8;
        const nBitsLeft = this._data.sigBytes * 8;

        // Add padding
        this._data.words[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
        this._data.words[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
        this._data.words[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
        this._data.sigBytes = this._data.words.length * 4;

        // Hash final blocks
        this._process();

        // Return final computed hash
        return this._hash;
    }

    protected _doProcessBlock(m: number[], offset: number) {
        // Working variables
        let a = this._hash.words[0];
        let b = this._hash.words[1];
        let c = this._hash.words[2];
        let d = this._hash.words[3];
        let e = this._hash.words[4];
        let f = this._hash.words[5];
        let g = this._hash.words[6];
        let h = this._hash.words[7];

        // Computation
        for (let i = 0; i < 64; i++) {
            if (i < 16) {
                W[i] = m[offset + i] | 0;
            }
            else {
                const gamma0x = W[i - 15];
                const gamma0 = ((gamma0x << 25) | (gamma0x >>> 7)) ^
                    ((gamma0x << 14) | (gamma0x >>> 18)) ^
                    (gamma0x >>> 3);

                const gamma1x = W[i - 2];
                const gamma1 = ((gamma1x << 15) | (gamma1x >>> 17)) ^
                    ((gamma1x << 13) | (gamma1x >>> 19)) ^
                    (gamma1x >>> 10);

                W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
            }

            const ch = (e & f) ^ (~e & g);
            const maj = (a & b) ^ (a & c) ^ (b & c);

            const sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
            const sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7) | (e >>> 25));

            const t1 = h + sigma1 + ch + K[i] + W[i];
            const t2 = sigma0 + maj;

            h = g;
            g = f;
            f = e;
            e = (d + t1) | 0;
            d = c;
            c = b;
            b = a;
            a = (t1 + t2) | 0;
        }

        // Intermediate hash value
        this._hash.words[0] = (this._hash.words[0] + a) | 0;
        this._hash.words[1] = (this._hash.words[1] + b) | 0;
        this._hash.words[2] = (this._hash.words[2] + c) | 0;
        this._hash.words[3] = (this._hash.words[3] + d) | 0;
        this._hash.words[4] = (this._hash.words[4] + e) | 0;
        this._hash.words[5] = (this._hash.words[5] + f) | 0;
        this._hash.words[6] = (this._hash.words[6] + g) | 0;
        this._hash.words[7] = (this._hash.words[7] + h) | 0;
    }

}
