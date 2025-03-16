import {BlockCipherModeAlgorithm} from "../block-cipher-mode-algorithm.class.js";

export class CTREncryptor extends BlockCipherModeAlgorithm {

    protected _counter: number[] = [];
    protected _prevBlock: number[] | undefined;

    /**
     * Processes the data block at offset.
     *
     * @param words The data words to operate on.
     * @param offset The offset where the block starts.
     *
     * @example
     *
     *     mode.processBlock(data.words, offset);
     */
    processBlock(words: number[], offset: number) {
        const blockSize = this._cipher.cfg.blockSize;
        if (this._iv) {
            this._counter = this._iv.slice(0);
            this._iv = void 0;
        }
        const keystream = this._counter.slice(0);
        this._cipher.encryptBlock(keystream, 0);
        this._counter[blockSize - 1] = this._counter[blockSize - 1] + 1 | 0;
        for (let i = 0; i < blockSize; i++) {
            words[offset + i] ^= keystream[i];
        }
    }
}
