import {WordArray} from "../lib/word-array.class.js";
import {Hasher} from "../lib/hasher.class.js";
import {MD5} from "../algo/md5.class.js";
import {AbstractKDF} from "./kdf.model.js";

export interface OptionalEVPKDFConfig {
    keySize?: number;
    hasher?: typeof Hasher;
    iterations?: number;
}

export interface EVPKDFConfig extends OptionalEVPKDFConfig {
    keySize: number;
    hasher: typeof Hasher;
    iterations: number;
}

export class EVPKDF implements AbstractKDF {
    cfg: EVPKDFConfig;

    /**
     * Initializes a newly created key derivation function.
     *
     * @param cfg (Optional) The configuration options to use for the derivation.
     *
     * @example
     *
     *     let kdf = EvpKDF.create();
     *     let kdf = EvpKDF.create({ keySize: 8 });
     *     let kdf = EvpKDF.create({ keySize: 8, iterations: 1000 });
     */
    constructor(cfg?: OptionalEVPKDFConfig) {
        this.cfg = Object.assign({
            keySize: 128 / 32,
            hasher: MD5,
            iterations: 1
        }, cfg);
    }

    static execute(password: WordArray | string, salt: WordArray | string, cfg?: OptionalEVPKDFConfig): WordArray {
        return new EVPKDF(cfg).compute(password, salt);
    }

    /**
     * Derives a key from a password.
     *
     * @param password The password.
     * @param salt A salt.
     *
     * @return The derived key.
     *
     * @example
     *
     *     let key = kdf.compute(password, salt);
     */
    compute(password: WordArray | string, salt: WordArray | string): WordArray {
        // Init hasher
        const hasher = new (this.cfg.hasher as any)();

        // Initial values
        const derivedKey = new WordArray();

        // Generate key
        let block;
        while (derivedKey.words.length < this.cfg.keySize) {
            if (block) {
                hasher.update(block);
            }
            block = hasher.update(password).finalize(salt);
            hasher.reset();

            // Iterations
            for (let i = 1; i < this.cfg.iterations; i++) {
                block = hasher.finalize(block);
                hasher.reset();
            }

            derivedKey.concat(block);
        }
        derivedKey.sigBytes = this.cfg.keySize * 4;

        return derivedKey;
    }
}
