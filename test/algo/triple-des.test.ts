import {Hex, tripleDesHelper, Utf8, TripleDES, PasswordBasedCipher} from "../../src";

describe("TripleDES", () => {

    const _ctx = {
        iv: "b7a6c3f91e28d47b95f0a1c24d3e8b72",
        key: "Avengers",
        plainText: "Peter Parker is Spiderman"
    };

    it("should encrypt and decrypt (PasswordBaseCipher)", () => {
        const encrypted = PasswordBasedCipher.encrypt(TripleDES, _ctx.plainText, _ctx.key).toString();
        const decrypted = PasswordBasedCipher.decrypt(TripleDES, encrypted, _ctx.key).toString(Utf8);

        expect(decrypted).toEqual(_ctx.plainText);
    });

    it("should encrypt and decrypt (tripleDesHelper)", () => {
        const encTony = tripleDesHelper.encrypt(_ctx.plainText, _ctx.key, {
            iv: Hex.parse(_ctx.iv)
        }).toString();
        const decTony = tripleDesHelper.decrypt(encTony, _ctx.key, {
            iv: Hex.parse(_ctx.iv)
        }).toString(Utf8);

        expect(decTony).toEqual(_ctx.plainText);
    });
});
