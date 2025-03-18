import {BlockCipher} from "../lib/block-cipher.class.js";
import {TripleDES} from "../algo/triple-des.class.js";
import {CipherHelper} from "../lib/cipher-helper.class.js";

export const tripleDesHelper: CipherHelper = BlockCipher._createHelper(TripleDES);
