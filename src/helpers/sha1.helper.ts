import {Hasher} from "../lib/hasher.class.js";
import {SHA1} from "../algo/sha1.class.js";
import {HasherHelper} from "../lib/hasher-helper.type.js";

export const sha1Helper: HasherHelper = Hasher._createHelper(SHA1);
