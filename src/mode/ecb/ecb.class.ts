import {BlockCipherMode} from "../block-cipher-mode.class.js";
import {ECBEncryptor} from "./ecb-encryptor.class.js";
import {ECBDecryptor} from "./ecb-decryptor.class.js";

/**
 * Cipher Block Chaining mode.
 */
export abstract class ECB extends BlockCipherMode {

    static Decryptor: typeof ECBDecryptor = ECBDecryptor;
    static Encryptor: typeof ECBEncryptor = ECBEncryptor;
}
