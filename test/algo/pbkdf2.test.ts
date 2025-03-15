import {Hex, PBKDF2, SHA1} from "../../src";
import cry from "../crypto-js.js";

describe("PBKDF2", () => {

    const _ctx = {
        expectedKey: "665c637818032c253433b35755c6b9d035c3c57179c346bf7a15e36f44e33983",
        aesConfig: {
            password: 'KY93In2I$5cme7EU',
            initVector: '32f2ee4027f8b2a032f2ee4027f8b2a0',
            salt: 'e0cf1267f564b362',
        }
    };

    it("should generate sha256 correctly", () => {
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
