import {Hex, PBKDF2, SHA1, aesHelper, Utf8, CBC, PKCS7} from "../../src";
import cry from "../crypto-js.js";

describe("AES_MC", () => {

    const _ctx = {
        aesConfig: {
            password: "KY93In2I$5cme7EU",
            initVector: "32f2ee4027f8b2a032f2ee4027f8b2a0",
            salt: "e0cf1267f564b362"
        },
        pairs: [
            {email: "foo@gmail.com", hash: "uIbT344cCUI8o7WQyoYnaA=="},
            {email: "bar@gmail.com", hash: "5RGDT/j2nPzMMRUAha/2eA=="},
        ],
        cryHelper: aesHelperBuilder(cry.AES, cry.enc.Hex, cry.mode.CBC, cry.pad.Pkcs7, cry.enc.Utf8, cry.algo.SHA1, cry.PBKDF2),
        tonyHelper: aesHelperBuilder(aesHelper, Hex, CBC, PKCS7, Utf8, SHA1, PBKDF2.execute)
    };

    it("should generate AES correctly", () => {
        const item = _ctx.pairs[0];
        const cryptoJsKey = _ctx.cryHelper.encryptAES(item.email, _ctx.aesConfig.password, _ctx.aesConfig.salt, _ctx.aesConfig.initVector);
        const tonyKey = _ctx.tonyHelper.encryptAES(item.email, _ctx.aesConfig.password, _ctx.aesConfig.salt, _ctx.aesConfig.initVector);
        expect(cryptoJsKey).toEqual(item.hash);
        expect(tonyKey).toEqual(item.hash);
        expect(_ctx.cryHelper.decryptAES(cryptoJsKey, _ctx.aesConfig.password, _ctx.aesConfig.salt, _ctx.aesConfig.initVector)).toEqual(item.email);
        expect(_ctx.tonyHelper.decryptAES(tonyKey, _ctx.aesConfig.password, _ctx.aesConfig.salt, _ctx.aesConfig.initVector)).toEqual(item.email);
    });
});

//

function aesHelperBuilder(
    AES: { decrypt: (...args: any[]) => any, encrypt: (...args: any[]) => any },
    Hex: { parse: (key: any) => any },
    CBC: any,
    Pkcs7: any,
    Utf8: any,
    SHA1: any,
    PBKDF2: any
) {

    function buildKey(password: string, salt: string) {
        const builtKey = PBKDF2(password, Hex.parse(salt), {
            keySize: 256 / 32,
            iterations: 1000,
            hasher: SHA1
        });

        console.info("BUILT KEY", builtKey.toString(Hex));

        return builtKey;
    }

    return {
        decryptAES(data: string, password: string, salt: string, initVector: string) {
            return AES.decrypt(data, buildKey(password, salt), {
                iv: Hex.parse(initVector),
                mode: CBC,
                padding: Pkcs7
            }).toString(Utf8);
        },
        encryptAES(data: string, password: string, salt: string, initVector: string) {
            return AES.encrypt(data, buildKey(password, salt), {
                iv: Hex.parse(initVector),
                mode: CBC,
                padding: Pkcs7
            }).toString();
        }
    };
}
