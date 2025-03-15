import { WordArray } from '../lib/word-array.class.js';

export interface Padding {
    pad: (data: WordArray, blockSize: number) => void;

    unpad: (data: WordArray) => void;
}
