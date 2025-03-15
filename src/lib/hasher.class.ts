import {BufferedBlockAlgorithm} from "./buffered-block-algorithm.class.js";
import {BufferedBlockAlgorithmConfig} from "./buffered-block-algorithm-config.interface.js";
import {WordArray} from "./word-array.class.js";
import {HMAC} from "./hmac.class.js";

export type HasherConstructor<T extends Hasher = Hasher> = new (cfg?: BufferedBlockAlgorithmConfig) => T;

export abstract class Hasher extends BufferedBlockAlgorithm {
    /**
     * Creates a shortcut function to the object interface of a hasher.
     *
     * @param hasher The hasher to create a helper for.
     *
     * @return The shortcut function.
     *
     * @example
     *
     *     const SHA256 = Hasher._createHelper(SHA256);
     */
    public static _createHelper<T extends Hasher = Hasher>(hasher: HasherConstructor<T>): (message: WordArray | string, cfg?: BufferedBlockAlgorithmConfig) => WordArray {
        function helper(message: WordArray | string, cfg?: BufferedBlockAlgorithmConfig) {
            const hasherClass: any = hasher;

            const hasherInstance: T = new hasherClass(cfg);

            return hasherInstance.finalize(message);
        }

        return helper;
    }

    /**
     * Creates a shortcut function to the HMAC's object interface.
     *
     * @param {Hasher} hasher The hasher to use in this HMAC helper.
     *
     * @return {Function} The shortcut function.
     *
     * @static
     *
     * @example
     *
     *     const HmacSHA256 = Hasher._createHmacHelper(SHA256);
     */
    public static _createHmacHelper<T extends Hasher = Hasher>(hasher: HasherConstructor<T>) {
        return function (message: WordArray | string, key?: WordArray | string) {
            return new HMAC().init(hasher, key).finalize(message);
        };
    }

    /**
     * Initializes a newly created hasher.
     *
     * @param cfg (Optional) The configuration options to use for this hash computation.
     *
     * @example
     *
     *     let hasher = CryptoJS.algo.SHA256.create();
     */
    public constructor(cfg?: BufferedBlockAlgorithmConfig) {
        // Apply config defaults
        super(Object.assign({
            blockSize: 512 / 32
        }, cfg));

        // Set initial values
        this.reset();
    }

    abstract _doFinalize(): WordArray;

    /**
     * Finalizes the hash computation.
     * Note that the finalize operation is effectively a destructive, read-once operation.
     *
     * @param messageUpdate (Optional) A final message update.
     *
     * @return The hash.
     *
     * @example
     *
     *     let hash = hasher.finalize();
     *     let hash = hasher.finalize('message');
     *     let hash = hasher.finalize(wordArray);
     */
    finalize(messageUpdate?: WordArray | string): WordArray {
        // Final message update
        if (messageUpdate) {
            this._append(messageUpdate);
        }

        // Perform concrete-hasher logic
        return this._doFinalize();
    }

    /**
     * Updates this hasher with a message.
     *
     * @param messageUpdate The message to append.
     *
     * @return This hasher.
     *
     * @example
     *
     *     hasher.update('message');
     *     hasher.update(wordArray);
     */
    update(messageUpdate: WordArray | string): Hasher {
        // Append
        this._append(messageUpdate);

        // Update the hash
        this._process();

        // Chainable
        return this;
    }

}

