import {Hasher} from "../lib/hasher.class.js";
import {SHA512} from "../algo/sha512.class.js";
import {HasherHelper} from "../lib/hasher-helper.type.js";

export const sha512Helper: HasherHelper = Hasher._createHelper(SHA512);
