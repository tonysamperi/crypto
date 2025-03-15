import {SHA256} from "../algo/sha256.class.js";
import {WordArray} from "../lib/word-array.class.js";
import {HMAC} from "../lib/hmac.class.js";
import {HasherConstructor} from "../lib/hasher-constructor.type.js";
import {PBKDF2Config} from "./pbkdf2-config.interface.js";

export class PBKDF2 {
    cfg: PBKDF2Config;

    constructor(cfg: Partial<PBKDF2Config>) {
        this.cfg = {
            keySize: 128 / 32,
            hasher: SHA256,
            iterations: 25e4,
            ...cfg
        };
    }

    static execute(password: WordArray | string, salt: WordArray | string, cfg?: {
        keySize?: number,
        hasher?: HasherConstructor,
        iterations?: number
    }): WordArray {
        return new PBKDF2(cfg).compute(password, salt);
    }

    compute(password: WordArray | string, salt: WordArray | string): WordArray {
        const cfg = this.cfg;
        const hmac = new HMAC(cfg.hasher, password);
        const derivedKey = new WordArray();
        const blockIndex = new WordArray([1]);
        const derivedKeyWords = derivedKey.words;
        const blockIndexWords = blockIndex.words;
        const keySize = cfg.keySize;
        const iterations = cfg.iterations;

        while (derivedKeyWords.length < keySize) {
            let block = hmac.update(salt).finalize(blockIndex);
            hmac.reset();
            const blockWords = block.words;
            const blockWordsLength = blockWords.length;
            let intermediate = block;

            for (let i = 1; i < iterations; i++) {
                intermediate = hmac.finalize(intermediate);
                hmac.reset();
                const intermediateWords = intermediate.words;

                for (let j = 0; j < blockWordsLength; j++) {
                    blockWords[j] ^= intermediateWords[j];
                }
            }

            derivedKey.concat(block);
            blockIndexWords[0]++;
        }

        derivedKey.sigBytes = keySize * 4;
        return derivedKey;
    }
}
