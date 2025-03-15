import {Formatter} from "../format/formatter.interface.js";
import {WordArray} from "./word-array.class.js";
import {KDF} from "../kdf/kdf.interface.js";
import {BlockCipherMode} from "../mode/block-cipher-mode.class.js";
import {Padding} from "../pad/padding.class.js";

export interface BufferedBlockAlgorithmConfig {
    // requires at least a blockSize
    blockSize?: number;
    iv?: WordArray;
    format?: Formatter;
    kdf?: KDF;
    mode?: typeof BlockCipherMode;
    padding?: Padding;
}
