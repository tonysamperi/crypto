import {
    aesHelper,
    sha256Helper,
    Hex,
    AES,
    WordArray,
    ECB,
    NoPadding,
    CipherParams,
    SerializableCipher,
    PasswordBasedCipher
} from "../../src";

describe("AES", () => {

    it("EncryptKeySize128", () => {
        expect(
            aesHelper.encrypt(
                Hex.parse("00112233445566778899aabbccddeeff"),
                Hex.parse("000102030405060708090a0b0c0d0e0f"),
                {
                    mode: ECB,
                    padding: NoPadding
                }
            ).ciphertext!.toString()
        ).toEqual("69c4e0d86a7b0430d8cdb78070b4c55a");
    });

    it("EncryptKeySize192", () => {
        expect(
            aesHelper.encrypt(
                Hex.parse("00112233445566778899aabbccddeeff"),
                Hex.parse("000102030405060708090a0b0c0d0e0f1011121314151617"),
                {
                    mode: ECB,
                    padding: NoPadding
                }
            ).ciphertext!.toString()
        ).toEqual("dda97ca4864cdfe06eaf70a0ec0d7191");
    });

    it("EncryptKeySize256", () => {
        expect(
            aesHelper.encrypt(
                Hex.parse("00112233445566778899aabbccddeeff"),
                Hex.parse("000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f"),
                {
                    mode: ECB,
                    padding: NoPadding
                }
            ).ciphertext!.toString()
        ).toEqual("8ea2b7ca516745bfeafc49904b496089");
    });

    it("DecryptKeySize128", () => {
        expect(
            aesHelper.decrypt(
                new CipherParams({
                    ciphertext: Hex.parse("69c4e0d86a7b0430d8cdb78070b4c55a")
                }),
                Hex.parse("000102030405060708090a0b0c0d0e0f"),
                {
                    mode: ECB,
                    padding: NoPadding
                }
            ).toString()
        ).toEqual("00112233445566778899aabbccddeeff");
    });

    it("DecryptKeySize192", () => {
        expect(
            aesHelper.decrypt(
                new CipherParams({
                    ciphertext: Hex.parse("dda97ca4864cdfe06eaf70a0ec0d7191")
                }),
                Hex.parse("000102030405060708090a0b0c0d0e0f1011121314151617"),
                {
                    mode: ECB,
                    padding: NoPadding
                }
            ).toString()
        ).toEqual("00112233445566778899aabbccddeeff");
    });

    it("DecryptKeySize256", () => {
        expect(
            aesHelper.decrypt(
                new CipherParams({
                    ciphertext: Hex.parse("8ea2b7ca516745bfeafc49904b496089")
                }),
                Hex.parse("000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f"),
                {
                    mode: ECB,
                    padding: NoPadding
                }
            ).toString()
        ).toEqual("00112233445566778899aabbccddeeff");
    });

    it("MultiPart", () => {
        const aes = AES.createEncryptor(Hex.parse("000102030405060708090a0b0c0d0e0f"), {
            mode: ECB,
            padding: NoPadding
        });
        const ciphertext1 = aes.process(Hex.parse("001122334455"));
        const ciphertext2 = aes.process(Hex.parse("66778899aa"));
        const ciphertext3 = aes.process(Hex.parse("bbccddeeff"));
        const ciphertext4 = aes.finalize();

        expect(
            ciphertext1.concat(ciphertext2).concat(ciphertext3).concat(ciphertext4).toString()
        ).toEqual("69c4e0d86a7b0430d8cdb78070b4c55a");
    });

    it("InputIntegrity", () => {
        const message = Hex.parse("00112233445566778899aabbccddeeff");
        const key = Hex.parse("000102030405060708090a0b0c0d0e0f");
        const iv = Hex.parse("101112131415161718191a1b1c1d1e1f");

        const expectedMessage = message.toString();
        const expectedKey = key.toString();
        const expectedIv = iv.toString();

        aesHelper.encrypt(message, key, {iv: iv});

        expect(expectedMessage).toEqual(message.toString());
        expect(expectedKey).toEqual(key.toString());
        expect(expectedIv).toEqual(iv.toString());
    });

    it("Helper", () => {
        // Save original random method
        const random = WordArray.random;

        // Replace random method with one that returns a predictable value
        WordArray.random = function (nBytes: number) {
            const words = [];
            for (let i = 0; i < nBytes; i += 4) {
                words.push(0x11223344);
            }

            return new WordArray(words, nBytes);
        };

        // Test
        expect(
            AES.createEncryptor(
                sha256Helper("Jefe"), {mode: ECB, padding: NoPadding}
            ).finalize("Hi There").toString()
        ).toEqual(
            aesHelper.encrypt(
                "Hi There", sha256Helper("Jefe"), {mode: ECB, padding: NoPadding}
            ).ciphertext!.toString()
        );

        expect(
            SerializableCipher.encrypt(
                AES, "Hi There", sha256Helper("Jefe"), {mode: ECB, padding: NoPadding}
            ).toString()
        ).toEqual(
            aesHelper.encrypt("Hi There", sha256Helper("Jefe"), {mode: ECB, padding: NoPadding}).toString()
        );

        expect(
            PasswordBasedCipher.encrypt(AES, "Hi There", "Jefe", {
                mode: ECB,
                padding: NoPadding
            }).toString()
        ).toEqual(
            aesHelper.encrypt("Hi There", "Jefe", {mode: ECB, padding: NoPadding}).toString()
        );

        // Restore random method
        WordArray.random = random;
    });
});
