import {BlockCipher} from "../lib/block-cipher.class.js";
import {DES} from "../algo/des.class.js";
import {CipherHelper} from "../lib/cipher-helper.class.js";

export const desHelper: CipherHelper = BlockCipher._createHelper(DES);
