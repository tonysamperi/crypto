import {BlockCipher} from "../lib/block-cipher.class.js";
import {TripleDES} from "../algo/triple-des.class.js";

export const tripleDesHelper = BlockCipher._createHelper(TripleDES);
