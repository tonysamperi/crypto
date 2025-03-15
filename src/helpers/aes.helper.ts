import {BlockCipher} from "../lib/block-cipher.class.js";
import {AES} from "../algo/aes.class.js";

export const aesHelper = BlockCipher._createHelper(AES);
