import {BlockCipher} from "../lib/block-cipher.class.js";
import {AES} from "../algo/aes.class.js";
import {CipherHelper} from "../lib/cipher-helper.class.js";

export const aesHelper: CipherHelper = BlockCipher._createHelper(AES);
