import {WordArray} from "../lib/word-array.class.js";

export class NoPadding {
    /**
     * Doesn't pad the data provided.
     *
     * @param _data_ The data to pad.
     * @param _blockSize_ The multiple that the data should be padded to.
     *
     * @example
     *
     *     NoPadding.pad(wordArray, 4);
     */
    public static pad(_data_: WordArray, _blockSize_: number): void {
    }

    /**
     * Doesn't un-pad the data provided.
     *
     * @param _data_ The data to un-pad.
     *
     * @example
     *
     *     NoPadding.unpad(wordArray);
     */
    public static unpad(_data_: WordArray): void {
    }
}
