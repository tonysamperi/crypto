import {Hex, PBKDF2, SHA1} from "../../src";
import cry from "../crypto-js.js";

describe("PBKDF2", () => {

    const _ctx = {
        aesConfig: {
            password: 'KY93In2I$5cme7EU',
            salt: 'e0cf1267f564b362',
        },
        expectedKey: "665c637818032c253433b35755c6b9d035c3c57179c346bf7a15e36f44e33983"
    };

    it("should generate PKBDF2", () => {
        const cryptoJsKey = cry.PBKDF2(_ctx.aesConfig.password, cry.enc.Hex.parse(_ctx.aesConfig.salt), {
            keySize: 256 / 32,
            iterations: 1000,
            hasher: cry.algo.SHA1
        }).toString(cry.enc.Hex);
        const tonyKey = PBKDF2.execute(_ctx.aesConfig.password, Hex.parse(_ctx.aesConfig.salt), {
            keySize: 256 / 32,
            iterations: 1000,
            hasher: SHA1
        }).toString(Hex);

        expect(cryptoJsKey).toEqual(_ctx.expectedKey);
        expect(tonyKey).toEqual(_ctx.expectedKey);
    });
});
