import {BlockCipher} from "../lib/block-cipher.class.js";
import {BlockCipherModeAlgorithm} from "./block-cipher-mode-algorithm.class.js";

export abstract class BlockCipherMode {

    static Decryptor: any = BlockCipherModeAlgorithm;
    static Encryptor: any = BlockCipherModeAlgorithm;

    /**
     * Creates this mode for decryption.
     *
     * @param cipher A block cipher instance.
     * @param iv The IV words.
     *
     * @example
     *
     *     const mode = CBC.createDecryptor(cipher, iv.words);
     */
    static createDecryptor(cipher: BlockCipher, iv: number[]): BlockCipherModeAlgorithm {
        // workaround for typescript not being able to create a abstract creator function directly
        const decryptorClass: any = this.Decryptor;

        return new decryptorClass(cipher, iv);
    }

    /**
     * Creates this mode for encryption.
     *
     * @param cipher A block cipher instance.
     * @param iv The IV words.
     *
     * @example
     *
     *     var mode = CBC.createEncryptor(cipher, iv.words);
     */
    static createEncryptor(cipher: BlockCipher, iv: number[]): BlockCipherModeAlgorithm {
        // workaround for typescript not being able to create a abstract creator function directly
        const encryptorClass: any = this.Encryptor;

        return new encryptorClass(cipher, iv);
    }

}
