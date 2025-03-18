import {WordArray} from "../lib/word-array.class.js";
import {CipherParams} from "../lib/cipher-params.class.js";

export abstract class AbstractKDF {
    static execute: (password: string, keySize: number, ivSize: number, salt?: WordArray | string) => CipherParams;

    abstract compute?(password: WordArray | string, salt: WordArray | string): WordArray;
}

export type KDF = typeof AbstractKDF;
