// import {Hex} from "../../src";
import cry from "../crypto-js.cjs";

describe("PBKDF2", () => {

    const _ctx = {
        expectedKey: "cc5d38da46c86a2d2f548d2e51651a1ecdb0a92230baed12a2b7d274b6fdbe92",
        aesConfig: {
            password: 'p?IG~t1~85TN*2?z',
            initVector: 'f7313582bf82685ab148f03fdac29d54',
            salt: 'b19d311589244b27',
        }
    };

    it("should generate sha256 correctly", () => {
        const cryptoJsKey  = cry.PBKDF2(_ctx.aesConfig.password, cry.enc.Hex.parse(_ctx.aesConfig.salt), {
            keySize: 256 / 32,
            iterations: 1000,
            hasher: cry.algo.SHA1,
        });
        // const tonyKey = new SHA256().update(Utf8.parse(value)).finalize().toString();

        expect(cryptoJsKey).toEqual(_ctx.expectedKey);
        // expect(tonySha256Helper).toEqual(tonySha256);
        // expect(tonySha256Helper).toEqual(cryptoJsKey);

    });
});
