import {MD5, Utf8, Hex, md5Helper} from "../../src";
import cry from "../crypto-js.js";

describe("MD5", () => {

    const _ctx = {
        gcSeed: "passkey" + "secret",
        pairs: [
            {value: "IronMan", hashed: "ef07e11ef83c219f307ae99191641528"},
            {value: "CaptainAmerica", hashed: "c207e787791638f72bcb2dea2ca3ae52"},
            {value: "Thor", hashed: "a92da8d9ebd1059f11a0e2f66c0b8e44"},
            {value: "SpiderMan", hashed: "04c727a23a5da4f41f432dad68e22f72"},
            {value: "DoctorStrange", hashed: "5668d487506ddd857cb5f98548d29670"}
        ]
    };

    it("should generate md5", () => {
        for (const {value, hashed} of _ctx.pairs) {
            const cryptoJsMd5 = cry.algo.MD5.create().update(Utf8.parse(value)).finalize().toString();
            const tonyMd5 = new MD5().update(Utf8.parse(value)).finalize().toString();
            const tonyMd5Helper = md5Helper(Utf8.parse(value)).toString();

            expect(tonyMd5Helper).toEqual(hashed);
            expect(tonyMd5Helper).toEqual(tonyMd5);
            expect(tonyMd5Helper).toEqual(cryptoJsMd5);
        }
    });

    it("should generate md5 hmac", () => {
        const cryptoJsMd5 = cry.algo.MD5.create().update(Utf8.parse(_ctx.gcSeed)).finalize().toString(Hex).substring(0, 5).toUpperCase();
        const tonyMd5 = new MD5().update(Utf8.parse(_ctx.gcSeed)).finalize().toString(Hex).substring(0, 5).toUpperCase();
        const tonyMd5Helper = md5Helper(Utf8.parse(_ctx.gcSeed)).toString(Hex).substring(0, 5).toUpperCase();

        expect(tonyMd5Helper).toEqual("8BE3C");
        expect(tonyMd5Helper).toEqual(tonyMd5);
        expect(tonyMd5Helper).toEqual(cryptoJsMd5);
    });
});
