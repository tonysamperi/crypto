import {WordArray} from "./word-array.class.js";
import {BufferedBlockAlgorithmConfig} from "./buffered-block-algorithm-config.interface.js";
import {PasswordBasedCipher} from "./password-based-cipher.class.js";
import {SerializableCipher} from "./serializable-cipher.class.js";
import {CipherParams} from "./cipher-params.class.js";
import {Cipher} from "./cipher.class.js";

export class CipherHelper {

    constructor(private readonly _cipher: typeof Cipher) {
    }

    decrypt(ciphertext: CipherParams | string, key: WordArray | string, cfg?: BufferedBlockAlgorithmConfig) {
        if (typeof key === "string") {
            return PasswordBasedCipher.decrypt(this._cipher, ciphertext, key, cfg);
        }
        else {
            return SerializableCipher.decrypt(this._cipher, ciphertext, key, cfg);
        }
    }

    encrypt(message: WordArray | string, key: WordArray | string, cfg?: BufferedBlockAlgorithmConfig) {
        if (typeof key === "string") {
            return PasswordBasedCipher.encrypt(this._cipher, message, key, cfg);
        }
        else {
            return SerializableCipher.encrypt(this._cipher, message, key, cfg);
        }
    }
}
