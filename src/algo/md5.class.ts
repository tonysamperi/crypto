import {Hasher} from "../lib/hasher.class.js";
import {WordArray} from "../lib/word-array.class.js";

// Constants table
// eslint-disable-next-line @typescript-eslint/naming-convention
const T: number[] = [];

// Compute constants
for (let i = 0; i < 64; i++) {
    T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
}

export class MD5 extends Hasher {

    get hash() {
        return this._hash;
    }

    protected _hash!: WordArray;

    static FF(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
        const n = a + ((b & c) | (~b & d)) + x + t;
        return ((n << s) | (n >>> (32 - s))) + b;
    }

    static GG(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
        const n = a + ((b & d) | (c & ~d)) + x + t;
        return ((n << s) | (n >>> (32 - s))) + b;
    }

    public static HH(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
        const n = a + (b ^ c ^ d) + x + t;
        return ((n << s) | (n >>> (32 - s))) + b;
    }

    public static II(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
        const n = a + (c ^ (b | ~d)) + x + t;
        return ((n << s) | (n >>> (32 - s))) + b;
    }

    public reset() {
        // reset core values
        super.reset();

        this._hash = new WordArray([
            0x67452301, 0xefcdab89,
            0x98badcfe, 0x10325476
        ]);
    }

    protected _doFinalize(): WordArray {
        const nBitsTotal = this._nDataBytes * 8;
        const nBitsLeft = this._data.sigBytes * 8;

        // Add padding
        this._data.words[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);

        const nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
        const nBitsTotalL = nBitsTotal;
        this._data.words[(((nBitsLeft + 64) >>> 9) << 4) + 15] = (
            (((nBitsTotalH << 8) | (nBitsTotalH >>> 24)) & 0x00ff00ff) |
            (((nBitsTotalH << 24) | (nBitsTotalH >>> 8)) & 0xff00ff00)
        );
        this._data.words[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
            (((nBitsTotalL << 8) | (nBitsTotalL >>> 24)) & 0x00ff00ff) |
            (((nBitsTotalL << 24) | (nBitsTotalL >>> 8)) & 0xff00ff00)
        );

        this._data.sigBytes = (this._data.words.length + 1) * 4;
        // Hash final blocks
        this._process();
        // Swap endian
        for (let i = 0; i < 4; i++) {
            this._hash.words[i] = (((this._hash.words[i] << 8) | (this._hash.words[i] >>> 24)) & 0x00ff00ff) |
                (((this._hash.words[i] << 24) | (this._hash.words[i] >>> 8)) & 0xff00ff00);
        }

        // Return final computed hash
        return this._hash;
    }

    protected _doProcessBlock(m: number[], offset: number) {
        // Swap endian
        for (let i = 0; i < 16; i++) {
            // Shortcuts
            const offsetI = offset + i;
            const mOffsetI = m[offsetI];

            m[offsetI] = (
                (((mOffsetI << 8) | (mOffsetI >>> 24)) & 0x00ff00ff) |
                (((mOffsetI << 24) | (mOffsetI >>> 8)) & 0xff00ff00)
            );
        }

        const mOffsets: number[] = Array.from({length: 16});
        for (let i = 0; i < 16; i++) {
            mOffsets[i] = m[offset + i];
        }

        // Working variables
        let a = this._hash.words[0];
        let b = this._hash.words[1];
        let c = this._hash.words[2];
        let d = this._hash.words[3];

        // Computation
        a = MD5.FF(a, b, c, d, mOffsets[0], 7, T[0]);
        d = MD5.FF(d, a, b, c, mOffsets[1], 12, T[1]);
        c = MD5.FF(c, d, a, b, mOffsets[2], 17, T[2]);
        b = MD5.FF(b, c, d, a, mOffsets[3], 22, T[3]);
        a = MD5.FF(a, b, c, d, mOffsets[4], 7, T[4]);
        d = MD5.FF(d, a, b, c, mOffsets[5], 12, T[5]);
        c = MD5.FF(c, d, a, b, mOffsets[6], 17, T[6]);
        b = MD5.FF(b, c, d, a, mOffsets[7], 22, T[7]);
        a = MD5.FF(a, b, c, d, mOffsets[8], 7, T[8]);
        d = MD5.FF(d, a, b, c, mOffsets[9], 12, T[9]);
        c = MD5.FF(c, d, a, b, mOffsets[10], 17, T[10]);
        b = MD5.FF(b, c, d, a, mOffsets[11], 22, T[11]);
        a = MD5.FF(a, b, c, d, mOffsets[12], 7, T[12]);
        d = MD5.FF(d, a, b, c, mOffsets[13], 12, T[13]);
        c = MD5.FF(c, d, a, b, mOffsets[14], 17, T[14]);
        b = MD5.FF(b, c, d, a, mOffsets[15], 22, T[15]);

        a = MD5.GG(a, b, c, d, mOffsets[1], 5, T[16]);
        d = MD5.GG(d, a, b, c, mOffsets[6], 9, T[17]);
        c = MD5.GG(c, d, a, b, mOffsets[11], 14, T[18]);
        b = MD5.GG(b, c, d, a, mOffsets[0], 20, T[19]);
        a = MD5.GG(a, b, c, d, mOffsets[5], 5, T[20]);
        d = MD5.GG(d, a, b, c, mOffsets[10], 9, T[21]);
        c = MD5.GG(c, d, a, b, mOffsets[15], 14, T[22]);
        b = MD5.GG(b, c, d, a, mOffsets[4], 20, T[23]);
        a = MD5.GG(a, b, c, d, mOffsets[9], 5, T[24]);
        d = MD5.GG(d, a, b, c, mOffsets[14], 9, T[25]);
        c = MD5.GG(c, d, a, b, mOffsets[3], 14, T[26]);
        b = MD5.GG(b, c, d, a, mOffsets[8], 20, T[27]);
        a = MD5.GG(a, b, c, d, mOffsets[13], 5, T[28]);
        d = MD5.GG(d, a, b, c, mOffsets[2], 9, T[29]);
        c = MD5.GG(c, d, a, b, mOffsets[7], 14, T[30]);
        b = MD5.GG(b, c, d, a, mOffsets[12], 20, T[31]);

        a = MD5.HH(a, b, c, d, mOffsets[5], 4, T[32]);
        d = MD5.HH(d, a, b, c, mOffsets[8], 11, T[33]);
        c = MD5.HH(c, d, a, b, mOffsets[11], 16, T[34]);
        b = MD5.HH(b, c, d, a, mOffsets[14], 23, T[35]);
        a = MD5.HH(a, b, c, d, mOffsets[1], 4, T[36]);
        d = MD5.HH(d, a, b, c, mOffsets[4], 11, T[37]);
        c = MD5.HH(c, d, a, b, mOffsets[7], 16, T[38]);
        b = MD5.HH(b, c, d, a, mOffsets[10], 23, T[39]);
        a = MD5.HH(a, b, c, d, mOffsets[13], 4, T[40]);
        d = MD5.HH(d, a, b, c, mOffsets[0], 11, T[41]);
        c = MD5.HH(c, d, a, b, mOffsets[3], 16, T[42]);
        b = MD5.HH(b, c, d, a, mOffsets[6], 23, T[43]);
        a = MD5.HH(a, b, c, d, mOffsets[9], 4, T[44]);
        d = MD5.HH(d, a, b, c, mOffsets[12], 11, T[45]);
        c = MD5.HH(c, d, a, b, mOffsets[15], 16, T[46]);
        b = MD5.HH(b, c, d, a, mOffsets[2], 23, T[47]);

        a = MD5.II(a, b, c, d, mOffsets[0], 6, T[48]);
        d = MD5.II(d, a, b, c, mOffsets[7], 10, T[49]);
        c = MD5.II(c, d, a, b, mOffsets[14], 15, T[50]);
        b = MD5.II(b, c, d, a, mOffsets[5], 21, T[51]);
        a = MD5.II(a, b, c, d, mOffsets[12], 6, T[52]);
        d = MD5.II(d, a, b, c, mOffsets[3], 10, T[53]);
        c = MD5.II(c, d, a, b, mOffsets[10], 15, T[54]);
        b = MD5.II(b, c, d, a, mOffsets[1], 21, T[55]);
        a = MD5.II(a, b, c, d, mOffsets[8], 6, T[56]);
        d = MD5.II(d, a, b, c, mOffsets[15], 10, T[57]);
        c = MD5.II(c, d, a, b, mOffsets[6], 15, T[58]);
        b = MD5.II(b, c, d, a, mOffsets[13], 21, T[59]);
        a = MD5.II(a, b, c, d, mOffsets[4], 6, T[60]);
        d = MD5.II(d, a, b, c, mOffsets[11], 10, T[61]);
        c = MD5.II(c, d, a, b, mOffsets[2], 15, T[62]);
        b = MD5.II(b, c, d, a, mOffsets[9], 21, T[63]);

        // Intermediate hash value
        this._hash.words[0] = (this._hash.words[0] + a) | 0;
        this._hash.words[1] = (this._hash.words[1] + b) | 0;
        this._hash.words[2] = (this._hash.words[2] + c) | 0;
        this._hash.words[3] = (this._hash.words[3] + d) | 0;
    }
}
