import {Hasher} from "../lib/hasher.class.js";
import {SHA256} from "../algo/sha256.class.js";
import {HasherHelper} from "../lib/hasher-helper.type.js";

export const sha256Helper: HasherHelper = Hasher._createHelper(SHA256);
