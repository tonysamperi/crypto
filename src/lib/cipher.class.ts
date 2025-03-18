import {BufferedBlockAlgorithm} from "./buffered-block-algorithm.class.js";
import {WordArray} from "./word-array.class.js";
import {BufferedBlockAlgorithmConfig} from "./buffered-block-algorithm-config.interface.js";
import {CipherHelper} from "./cipher-helper.class.js";

export abstract class Cipher extends BufferedBlockAlgorithm {

    /**
     * This cipher's IV size. Default: 4 (128 bits / 32 Bits)
     */
    static ivSize = 4;

    /**
     * This cipher's key size. Default: 4 (128 bits / 32 Bits)
     */
    static keySize = 4;

    /**
     * A constant representing decryption mode.
     */
    protected static readonly _DEC_XFORM_MODE = 2;
    /**
     * A constant representing encryption mode.
     */
    protected static readonly _ENC_XFORM_MODE = 1;

    /**
     * The key.
     */
    protected _key: WordArray;

    /**
     * Either the encryption or decryption transformation mode constant.
     */
    protected _xformMode: number;

    /**
     * Initializes a newly created cipher.
     *
     * @param xformMode Either the encryption or decryption transormation mode constant.
     * @param key The key.
     * @param cfg (Optional) The configuration options to use for this operation.
     *
     * @example
     *
     *     let cipher = AES.create(AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
     */
    constructor(xformMode: number, key: WordArray, cfg?: BufferedBlockAlgorithmConfig) {
        // Apply config defaults
        super(Object.assign({
            blockSize: 1
        }, cfg));

        // Store transform mode and key
        this._xformMode = xformMode;
        this._key = key;

        // Set initial values
        this.reset();
    }

    /**
     * Creates shortcut functions to a cipher's object interface.
     *
     * @param cipher The cipher to create a helper for.
     *
     * @return An object with encrypt and decrypt shortcut functions.
     *
     * @example
     *
     *     const AES = Cipher._createHelper(AESAlgorithm);
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    static _createHelper(cipher: typeof Cipher) {

        return new CipherHelper(cipher);
    }

    /**
     * Creates this cipher in decryption mode.
     *
     * @param key The key.
     * @param cfg (Optional) The configuration options to use for this operation.
     *
     * @return A cipher instance.
     *
     * @example
     *
     *     let cipher = AES.createDecryptor(keyWordArray, { iv: ivWordArray });
     */
    static createDecryptor(key: WordArray | string, cfg?: BufferedBlockAlgorithmConfig): Cipher {
        // workaround for typescript not being able to create a abstract creator function directly
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const thisClass: any = this;

        return new thisClass(this._DEC_XFORM_MODE, key, cfg);
    }

    /**
     * Creates this cipher in encryption mode.
     *
     * @param key The key.
     * @param cfg (Optional) The configuration options to use for this operation.
     *
     * @return A cipher instance.
     *
     * @example
     *
     *     let cipher = AES.createEncryptor(keyWordArray, { iv: ivWordArray });
     */
    static createEncryptor(key: WordArray | string, cfg?: BufferedBlockAlgorithmConfig): Cipher {
        // workaround for typescript not being able to create an abstract creator function directly

        // @ts-expect-error this method will never run on the abstract
        return new this(this._ENC_XFORM_MODE, key, cfg);
    }

    /**
     * Finalizes the encryption or decryption process.
     * Note that the finalize operation is effectively a destructive, read-once operation.
     *
     * @param dataUpdate The final data to encrypt or decrypt.
     *
     * @return The data after final processing.
     *
     * @example
     *
     *     var encrypted = cipher.finalize();
     *     var encrypted = cipher.finalize('data');
     *     var encrypted = cipher.finalize(wordArray);
     */
    finalize(dataUpdate?: WordArray | string): WordArray {
        // Final data update
        if (dataUpdate) {
            this._append(dataUpdate);
        }

        // Perform concrete-cipher logic
        return this._doFinalize();
    }

    /**
     * Adds data to be encrypted or decrypted.
     *
     * @param dataUpdate The data to encrypt or decrypt.
     *
     * @return The data after processing.
     *
     * @example
     *
     *     let encrypted = cipher.process('data');
     *     let encrypted = cipher.process(wordArray);
     */
    process(dataUpdate: WordArray | string): WordArray {
        // Append
        this._append(dataUpdate);

        // Process available blocks
        return this._process();
    }

    /**
     * Cipher specific finalize function explicitly implemented in the derived class.
     */
    protected abstract _doFinalize(): WordArray;
}
