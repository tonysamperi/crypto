import {Hasher} from "./hasher.class.js";
import {HasherConstructor} from "./hasher-constructor.type.js";
import {WordArray} from "./word-array.class.js";
import {Utf8} from "../enc/utf8.class.js";

export class HMAC {
    private _hasher: Hasher;
    private _iKey: WordArray;
    private _oKey: WordArray;

    constructor(hasher: HasherConstructor, rawKey: WordArray | string) {
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
            oKeyWords[i] ^= 1549556828;
            iKeyWords[i] ^= 909522486;
        }
        oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;

        // Set initial values
        this.reset();
    }

    finalize(messageUpdate ?: WordArray | string) {
        const innerHash = this._hasher.finalize(messageUpdate);
        this._hasher.reset();

        return this._hasher.finalize(this._oKey.clone().concat(innerHash));
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
