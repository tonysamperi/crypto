import {BlockCipherModeAlgorithm} from "../block-cipher-mode-algorithm.class.js";

export class CBCEncryptor extends BlockCipherModeAlgorithm {

    get prevBlock() {
        return this._prevBlock;
    }

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
        // Check if we have a blockSize
        if (this._cipher.cfg.blockSize === undefined) {
            throw new Error("missing blockSize in cipher config");
        }

        // XOR and encrypt
        this.xorBlock(words, offset, this._cipher.cfg.blockSize);
        this._cipher.encryptBlock(words, offset);

        // Remember this block to use with next block
        this._prevBlock = words.slice(offset, offset + this._cipher.cfg.blockSize);
    }

    xorBlock(words: number[], offset: number, blockSize: number) {
        // Choose mixing block
        let block;
        if (this._iv) {
            block = this._iv;

            // Remove IV for subsequent blocks
            this._iv = undefined;
        }
        else {
            block = this._prevBlock;
        }

        // XOR blocks
        for (let i = 0; i < blockSize; i++) {
            words[offset + i] ^= block[i];
        }
    }
}
