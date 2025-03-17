import {BlockCipher} from "../lib/block-cipher.class.js";
import {WordArray} from "../lib/word-array.class.js";
import {BufferedBlockAlgorithmConfig} from "../lib/buffered-block-algorithm-config.interface.js";
import {DES} from "./des.class.js";

export class TripleDES extends BlockCipher {

    static blockSize = 192 / 32;
    static ivSize = 64 / 32;
    static keySize = 64 / 32;

    protected _des1: DES;
    protected _des2: DES;
    protected _des3: DES;

    constructor(xformMode: number, key: WordArray, cfg?: BufferedBlockAlgorithmConfig) {
        super(xformMode, key, cfg);
        this.reset();
    }

    decryptBlock(m: number[], offset: number): void {
        this._des3.decryptBlock(m, offset);
        this._des2.encryptBlock(m, offset);
        this._des1.decryptBlock(m, offset);
    }

    encryptBlock(m: number[], offset: number): void {
        this._des1.encryptBlock(m, offset);
        this._des2.decryptBlock(m, offset);
        this._des3.encryptBlock(m, offset);
    }

    reset() {
        super.reset();
        if (this._key.words.length !== 2 && this._key.words.length !== 4 && this._key.words.length < 6) {
            throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");
        }
        const key1 = this._key.words.slice(0, 2);
        const key2 = this._key.words.length < 4 ? this._key.words.slice(0, 2) : this._key.words.slice(2, 4);
        const key3 = this._key.words.length < 6 ? this._key.words.slice(0, 2) : this._key.words.slice(4, 6);
        this._des1 = DES.createEncryptor(new WordArray(key1)) as DES;
        this._des2 = DES.createEncryptor(new WordArray(key2)) as DES;
        this._des3 = DES.createEncryptor(new WordArray(key3)) as DES;
    }

}
