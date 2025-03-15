import {HasherConstructor} from "../lib/hasher-constructor.type";

export interface PBKDF2Config {
    keySize: number,
    hasher: HasherConstructor,
    iterations: number
}
