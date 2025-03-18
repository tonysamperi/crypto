import {Hex, EVPKDF} from "../../src";
import cry from "../crypto-js.js";

describe("EVPKDF", () => {

    const _ctx = {
        aesConfig: {
            password: 'KY93In2I$5cme7EU',
            salt: 'e0cf1267f564b362',
        },
        expectedKey: "d3a0ed68e130e1f72cf8772c909f148d"
    };

    it("should generate EVPKDF", () => {
        const cryptoJsKey = cry.EvpKDF(_ctx.aesConfig.password, cry.enc.Hex.parse(_ctx.aesConfig.salt)).toString(cry.enc.Hex);
        const tonyKey = EVPKDF.execute(_ctx.aesConfig.password, Hex.parse(_ctx.aesConfig.salt)).toString(Hex);

        expect(cryptoJsKey).toEqual(_ctx.expectedKey);
        expect(tonyKey).toEqual(_ctx.expectedKey);
    });
});
