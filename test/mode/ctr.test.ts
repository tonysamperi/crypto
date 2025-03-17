import {
    AES, PasswordBasedCipher,
    CTR,
    Utf8,
    aesHelper, Hex
} from "../../src";

describe("CTR", () => {

    const _ctx = {
        iv: "b7a6c3f91e28d47b95f0a1c24d3e8b72",
        key: "Avengers",
        plainText: "Peter Parker is Spiderman"
    };

    it("should encrypt and decrypt (PasswordBaseCipher)", () => {
        const encrypted = PasswordBasedCipher.encrypt(AES, _ctx.plainText, _ctx.key, {
            mode: CTR
        }).toString();
        const decrypted = PasswordBasedCipher.decrypt(AES, encrypted, _ctx.key, {
            mode: CTR
        }).toString(Utf8);

        expect(decrypted).toEqual(_ctx.plainText);
    });

    it("should encrypt and decrypt (aesHelper)", () => {
        const encTony = aesHelper.encrypt(_ctx.plainText, _ctx.key, {
            mode: CTR,
            iv: Hex.parse(_ctx.iv)
        }).toString();
        const decTony = aesHelper.decrypt(encTony, _ctx.key, {
            mode: CTR,
            iv: Hex.parse(_ctx.iv)
        }).toString(Utf8);

        expect(decTony).toEqual(_ctx.plainText);
    });
});
