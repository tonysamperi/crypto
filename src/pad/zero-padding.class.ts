import {WordArray} from "../lib/word-array.class.js";
import {AbstractPadding} from "./padding.model.js";

export class ZeroPadding implements AbstractPadding {
    /**
     * Pads data using Zero padding algo
     *
     * @param data The data to pad.
     * @param blockSize The multiple that the data should be padded to.
     *
     * @example
     *
     *     ZeroPadding.pad(wordArray, 4);
     */
    static pad(data: WordArray, blockSize: number): void {
        const blockSizeBytes = blockSize * 4;
        data.clamp();
        data.sigBytes += blockSizeBytes - (data.sigBytes % blockSizeBytes || blockSizeBytes);
    }

    /**
     * Unpads data using Zero padding algo
     *
     * @param data The data to un-pad.
     *
     * @example
     *
     *     ZeroPadding.unpad(wordArray);
     */
    static unpad(data: WordArray): void {
        const dataWords = data.words;
        for (let i = data.sigBytes - 1; i >= 0; i--) {
            if (dataWords[i >>> 2] >>> 24 - i % 4 * 8 & 255) {
                data.sigBytes = i + 1;
                break;
            }
        }
    }
}
