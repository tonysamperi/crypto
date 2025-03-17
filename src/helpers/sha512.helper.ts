import {Hasher} from "../lib/hasher.class.js";
import {SHA512} from "../algo/sha512.class.js";

export const sha512Helper = Hasher._createHelper(SHA512);
