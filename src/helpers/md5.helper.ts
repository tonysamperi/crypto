import {Hasher} from "../lib/hasher.class.js";
import {MD5} from "../algo/md5.class.js";
import {HasherHelper} from "../lib/hasher-helper.type.js";

export const md5Helper: HasherHelper = Hasher._createHelper(MD5);
