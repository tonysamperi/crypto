import {BlockCipher} from "../lib/block-cipher.class.js";
import {BlockCipherMode} from "./block-cipher-mode.class.js";

export abstract class BlockCipherModeAlgorithm {

    // eslint-disable-next-line @typescript-eslint/naming-convention
    __creator: ((cipher: BlockCipher, iv: number[]) => BlockCipherMode) | undefined;

    protected _cipher!: BlockCipher;
    protected _iv: number[] | undefined;

    constructor(cipher: BlockCipher, iv: number[]) {
        this.init(cipher, iv);
    }

    abstract processBlock(words: number[], offset: number): void;

    /**
     * Initializes a newly created mode.
     *
     * @param cipher A block cipher instance.
     * @param iv The IV words.
     *
     * @example
     *
     *     var mode = CBC.Encryptor.create(cipher, iv.words);
     */
    init(cipher: BlockCipher, iv?: number[]) {
        this._cipher = cipher;
        this._iv = iv;
    }
}
