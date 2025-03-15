import { WordArray } from '../lib/word-array.class.js';
import { CipherParams } from '../lib/cipher-params.class.js';

export interface KDF {
    execute: (password: string, keySize: number, ivSize: number, salt?: WordArray | string) => CipherParams;
}
