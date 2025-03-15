import {Hasher} from "../lib/hasher.class.js";
import {SHA1} from "../algo/sha1.class.js";

export const sha1Helper = Hasher._createHelper(SHA1);
