import {Hex, desHelper, Utf8, DES, PasswordBasedCipher} from "../../src";

describe("DES", () => {

    const _ctx = {
        iv: "b7a6c3f91e28d47b95f0a1c24d3e8b72",
        key: "Avengers",
        plainText: "Peter Parker is Spiderman"
    };

    it("should encrypt and decrypt (PasswordBaseCipher)", () => {
        const encrypted = PasswordBasedCipher.encrypt(DES, _ctx.plainText, _ctx.key).toString();
        const decrypted = PasswordBasedCipher.decrypt(DES, encrypted, _ctx.key).toString(Utf8);

        expect(decrypted).toEqual(_ctx.plainText);
    });

    it("should encrypt and decrypt (desHelper)", () => {
        const encTony = desHelper.encrypt(_ctx.plainText, _ctx.key, {
            iv: Hex.parse(_ctx.iv)
        }).toString();
        const decTony = desHelper.decrypt(encTony, _ctx.key, {
            iv: Hex.parse(_ctx.iv)
        }).toString(Utf8);

        expect(decTony).toEqual(_ctx.plainText);
    });
});
