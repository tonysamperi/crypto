import {BufferedBlockAlgorithmConfig} from "./buffered-block-algorithm-config.interface.js";
import {Hasher} from "./hasher.class.js";

export type HasherConstructor<T extends Hasher = Hasher> = new (cfg?: BufferedBlockAlgorithmConfig) => T;
