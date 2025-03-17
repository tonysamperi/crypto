import {BlockCipherModeAlgorithm} from "../block-cipher-mode-algorithm.class.js";

export class ECBDecryptor extends BlockCipherModeAlgorithm {
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
        this._cipher.decryptBlock(words, offset);
    }
}
