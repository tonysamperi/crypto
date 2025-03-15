import {BlockCipher} from "../lib/block-cipher.class.js";
import {BlockCipherMode} from "./block-cipher-mode.class.js";

export abstract class BlockCipherModeAlgorithm {
    public _cipher!: BlockCipher;

    public _iv: number[] | undefined;

    public __creator: ((cipher: BlockCipher, iv: number[]) => BlockCipherMode) | undefined;

    public constructor(cipher: BlockCipher, iv: number[]) {
        this.init(cipher, iv);
    }

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
    public init(cipher: BlockCipher, iv?: number[]) {
        this._cipher = cipher;
        this._iv = iv;
    }

    public abstract processBlock(words: number[], offset: number): void;
}
