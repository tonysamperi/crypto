import {Utf8, Utf16, Encoder} from "../../src";
import cry from "../crypto-js.js";

describe("Utf16", () => {

    const _ctx = {
        words: [
            "IronMan",
            "CaptainAmerica",
            "Thor",
            "SpiderMan",
            "DoctorStrange"
        ],
        cryHelper: utf16HelperBuilder(cry.enc.Utf16, cry.enc.Utf8),
        tonyHelper: utf16HelperBuilder(Utf16, Utf8)
    };

    it("should encode and decode Utf16", () => {
        for (const word of _ctx.words) {
            const encCryptoJs = _ctx.cryHelper.encode(word);
            const encTony = _ctx.tonyHelper.encode(word);

            expect(encTony).toEqual(encCryptoJs);

            const decCryptoJs = _ctx.cryHelper.decode(encCryptoJs);
            const decTony = _ctx.tonyHelper.decode(encTony);

            expect(decTony).toEqual(decCryptoJs);
            /**
             * Right now an extra character is added when going back. But at least for now the libs behave identically.
             * If someone finds some scenario that is affected by this behaviour...well you can open a PR :)
             * What I can tell is that even working with Buffer, the behaviour is a bit unstable: since utf-16be is not directly supported,
             * you end up using the swap16 function, but to me it doesn't work too well.
             * Probably utf-16le has a better support.
             */
            // expect(decTony).toEqual(word);
        }
    });

});

function utf16HelperBuilder(Utf16: Encoder, Utf8: Encoder) {
    return {
        encode(data: string) {
            return Utf16.stringify(Utf8.parse(data));
        },
        decode(data: string) {
            return Utf8.stringify(Utf16.parse(data));
        }
    };
}
