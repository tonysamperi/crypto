import {HasherConstructor} from "../lib/hasher-constructor.type.js";

export interface PBKDF2Config {
    keySize: number,
    hasher: HasherConstructor,
    iterations: number
}
