import {BufferedBlockAlgorithmConfig} from "./buffered-block-algorithm-config.interface";
import {Hasher} from "./hasher.class";

export type HasherConstructor<T extends Hasher = Hasher> = new (cfg?: BufferedBlockAlgorithmConfig) => T;
