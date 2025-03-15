import {Utf8, Base64, Encoder} from "../../src";
import cry from "../crypto-js.js";

describe("Base64", () => {

    const _ctx = {
        pairs: [
            {value: "IronMan", hashed: "SXJvbk1hbg=="},
            {value: "CaptainAmerica", hashed: "Q2FwdGFpbkFtZXJpY2E="},
            {value: "Thor", hashed: "VGhvcg=="},
            {value: "SpiderMan", hashed: "U3BpZGVyTWFu"},
            {value: "DoctorStrange", hashed: "RG9jdG9yU3RyYW5nZQ=="}
        ],
        cryHelper: base64HelperBuilder(cry.enc.Base64, cry.enc.Utf8),
        tonyHelper: base64HelperBuilder(Base64, Utf8)
    };

    it("should encode base64", () => {
        for (const {value, hashed} of _ctx.pairs) {
            const cryptoJs = _ctx.cryHelper.encode(value);
            const tony = _ctx.tonyHelper.encode(value);

            expect(cryptoJs).toEqual(hashed);
            expect(tony).toEqual(hashed);
        }
    });

    it("should decode base64", () => {
        for (const {value, hashed} of _ctx.pairs) {
            const cryptoJs = _ctx.cryHelper.decode(hashed);
            const tony = _ctx.tonyHelper.decode(hashed);

            expect(cryptoJs).toEqual(value);
            expect(tony).toEqual(value);
        }
    });
});

function base64HelperBuilder(Base64: Encoder, Utf8: Encoder) {
    return {
        encode(data: string) {
            return Base64.stringify(Utf8.parse(data));
        },
        decode(data: string) {
            return Utf8.stringify(Base64.parse(data));
        }
    };
}
