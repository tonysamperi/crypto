import {BlockCipher} from "../lib/block-cipher.class.js";
import {BlockCipherModeAlgorithm} from "./block-cipher-mode-algorithm.class.js";

export abstract class BlockCipherMode {
    public static Encryptor: any = BlockCipherModeAlgorithm;

    public static Decryptor: any = BlockCipherModeAlgorithm;

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
    public static createEncryptor(cipher: BlockCipher, iv: number[]): BlockCipherModeAlgorithm {
        // workaround for typescript not being able to create a abstract creator function directly
        const encryptorClass: any = this.Encryptor;

        return new encryptorClass(cipher, iv);
    }

    /**
     * Creates this mode for decryption.
     *
     * @param cipher A block cipher instance.
     * @param iv The IV words.
     *
     * @example
     *
     *     var mode = CBC.createDecryptor(cipher, iv.words);
     */
    public static createDecryptor(cipher: BlockCipher, iv: number[]): BlockCipherModeAlgorithm {
        // workaround for typescript not being able to create a abstract creator function directly
        const decryptorClass: any = this.Decryptor;

        return new decryptorClass(cipher, iv);
    }
}
