import {Utf8, sha1Helper, SHA1} from "../../src";
import cry from "../crypto-js.js";

describe("SHA256", () => {

    const _ctx = {
        // Pairs calculated with crypto => createHash('sha1').update(value).digest('hex')
        pairs: [
            {value: "IronMan", hashed: "0b31a4f3b1f127b6fd87aa687db7b31ace4be13e"},
            {value: "CaptainAmerica", hashed: "c465c7d32651a7eabaaf6f28ca9c37805cf5573b"},
            {value: "Thor", hashed: "b750bf91c273e4f3ddb4f320d7202fe3ec31f456"},
            {value: "SpiderMan", hashed: "40935e2cd9838f6b4debff233be598e3ce259834"},
            {value: "DoctorStrange", hashed: "27161b5fef3a1c8fde9e8699e3d8c911146ba140"}
        ]
    };

    it("should generate sha1", () => {
        for (const {value, hashed} of _ctx.pairs) {
            const cryptoJs = cry.algo.SHA1.create().update(Utf8.parse(value)).finalize().toString();
            const tonySha = new SHA1().update(Utf8.parse(value)).finalize().toString();
            const tonyShaHelper = sha1Helper(Utf8.parse(value)).toString();

            expect(tonyShaHelper).toEqual(hashed);
            expect(tonyShaHelper).toEqual(tonySha);
            expect(tonyShaHelper).toEqual(cryptoJs);
        }
    });
});
