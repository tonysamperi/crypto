import {BlockCipherMode} from "../block-cipher-mode.class.js";
import {CTREncryptor} from "./ctr-encryptor.class.js";
import {CTRDecryptor} from "./ctr-decryptor.class.js";

/**
 * Counter mode.
 */
export abstract class CTR extends BlockCipherMode {
    static Decryptor = CTRDecryptor;
    static Encryptor = CTREncryptor;
}
