import {BlockCipherMode} from "../block-cipher-mode.class.js";
import {CBCEncryptor} from "./cbc-encryptor.class.js";
import {CBCDecryptor} from "./cbc-decryptor.class.js";

/**
 * Cipher Block Chaining mode.
 */
export abstract class CBC extends BlockCipherMode {
    static Decryptor = CBCDecryptor;
    static Encryptor = CBCEncryptor;
}
