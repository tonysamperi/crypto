import {Hasher} from "../lib/hasher.class.js";
import {MD5} from "../algo/md5.class.js";

export const md5Helper = Hasher._createHelper(MD5);
