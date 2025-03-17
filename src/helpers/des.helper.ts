import {BlockCipher} from "../lib/block-cipher.class.js";
import {DES} from "../algo/des.class.js";

export const desHelper = BlockCipher._createHelper(DES);
