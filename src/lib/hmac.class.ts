import {Hasher, HasherConstructor} from "./hasher.class.js";
import {WordArray} from "./word-array.class.js";
import {Utf8} from "../enc/utf8.class.js";

export class HMAC {
    private _hasher: Hasher;
    private _oKey: WordArray;
    private _iKey: WordArray;

    constructor() {

    }

    finalize(messageUpdate?: WordArray | string) {
        const innerHash = this._hasher.finalize(messageUpdate);
        // @ts-expect-error this will be used in non-abstract classes
        return new (this.hasher.constructor as typeof Hasher)()
            .update(this._oKey)
            .finalize(innerHash);
    }

    /**
     * Initializes a newly created HMAC.
     *
     * @param {Hasher} hasher The hash algorithm to use.
     * @param {WordArray|string} rawKey The secret key.
     *
     * @example
     *
     *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
     */
    init(hasher: HasherConstructor, rawKey: WordArray | string) {
        // Init hasher
        this._hasher = new hasher();
        // Convert string to WordArray, else assume WordArray already
        let key = typeof rawKey == "string" ? Utf8.parse(rawKey) : rawKey;

        // Shortcuts
        const hasherBlockSize = this._hasher.cfg.blockSize;
        const hasherBlockSizeBytes = hasherBlockSize * 4;

        // Allow arbitrary length keys
        if (key.sigBytes > hasherBlockSizeBytes) {
            key = this._hasher.finalize(key);
        }

        // Clamp excess bits
        key.clamp();

        // Clone key for inner and outer pads
        const oKey = this._oKey = key.clone();
        const iKey = this._iKey = key.clone();

        // Shortcuts
        const oKeyWords = oKey.words;
        const iKeyWords = iKey.words;

        // XOR keys with pad constants
        for (let i = 0; i < hasherBlockSize; i++) {
            oKeyWords[i] ^= 0x5c5c5c5c;
            iKeyWords[i] ^= 0x36363636;
        }
        oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;

        // Set initial values
        this.reset();

        return this;
    }

    reset() {
        this._hasher.reset();
        this._hasher.update(this._iKey);
    }

    update(messageUpdate: WordArray | string) {
        this._hasher.update(messageUpdate);

        return this;
    }
}
