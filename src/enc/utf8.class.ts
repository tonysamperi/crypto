import {WordArray} from "../lib/word-array.class.js";
import {Latin1} from "./latin1.class.js";
import {AbstractEncoder} from "./encoder.model";

export class Utf8 implements AbstractEncoder {
    /**
     * Converts a word array to a UTF-8 string.
     *
     * @param wordArray The word array.
     *
     * @return The UTF-8 string.
     *
     * @example
     *
     *     let utf8String = Utf8.stringify(wordArray);
     */
    static stringify(wordArray: WordArray): string {
        try {
            return decodeURIComponent(escape(Latin1.stringify(wordArray)));
        }
        catch (e) {
            throw new Error("Malformed UTF-8 data");
        }
    }

    /**
     * Converts a UTF-8 string to a word array.
     *
     * @param utf8Str The UTF-8 string.
     *
     * @return The word array.
     *
     * @example
     *
     *     let wordArray = Utf8.parse(utf8String);
     */
    static parse(utf8Str: string): WordArray {
        return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
    }
}
