import {WordArray} from "../lib/word-array.class.js";
import {AbstractEncoder} from "./encoder.model.js";

export class Utf16 implements AbstractEncoder {

    /**
     * Converts a UTF-16 BE string to a word array.
     *
     * @param utf16Str The UTF-16 BE string.
     *
     * @return The word array.
     *
     * @example
     *
     *     const wordArray = Utf16.parse(utf8String);
     */
    static parse(utf16Str: string): WordArray {
        const utf16StrLength = utf16Str.length;
        const words: number[] = [];
        for (let i = 0; i < utf16StrLength; i++) {
            words[i >>> 1] |= utf16Str.charCodeAt(i) << 16 - i % 2 * 16;
        }
        return new WordArray(words, utf16StrLength * 2);
    }

    /**
     * Converts a word array to a UTF-16 BE string.
     *
     * @param wordArray The word array.
     *
     * @return The UTF-16 BE string.
     *
     * @example
     *
     *     const utf16String = Utf16.stringify(wordArray);
     */
    static stringify(wordArray: WordArray): string {
        const words = wordArray.words;
        const sigBytes = wordArray.sigBytes;
        const utf16Chars: string[] = [];
        for (let i = 0; i < sigBytes; i += 2) {
            const codePoint = words[i >>> 2] >>> 16 - i % 4 * 8 & 65535;
            utf16Chars.push(String.fromCharCode(codePoint));
        }
        return utf16Chars.join("");
    }

}
