function buildHelper(
    AES: { decrypt: (...args: any[]) => any, encrypt: (...args: any[]) => any },
    Hex: { parse: (key: any) => any },
    CBC,
    Pkcs7,
    Utf8,
    SHA1
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
