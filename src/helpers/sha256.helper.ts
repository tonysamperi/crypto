import {Hasher} from "../lib/hasher.class.js";
import {SHA256} from "../algo/sha256.class.js";

export const sha256Helper = Hasher._createHelper(SHA256);
