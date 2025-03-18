import {WordArray} from "./word-array.class.js";
import {BufferedBlockAlgorithmConfig} from "./buffered-block-algorithm-config.interface.js";

export type HasherHelper = (message: WordArray | string, cfg?: BufferedBlockAlgorithmConfig) => WordArray;
