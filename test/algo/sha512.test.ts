import {Utf8, sha512Helper, SHA512} from "../../src";
import cry from "../crypto-js.js";

describe("SHA512", () => {

    const _ctx = {
        // Pairs calculated with crypto => createHash('sha512').update(value).digest('hex')
        pairs: [
            {value: "IronMan", hashed: "5e591e9d72d811acd6d9e28c76f27a231e1c6468d9d7ed67a6371c3013d89b3c29d842638707c953159d7cd788e8056ed7af532f271bcdb44968159170012c86"},
            {value: "CaptainAmerica", hashed: "5aa841f2ed6ab5cbdeeaa72b45da365fd4cb993c578262d6118bbadf05f2d8d79e4fd23f1079448fa979b6e35b79fb080630541670b9d89bebffdff2aab921ff"},
            {value: "Thor", hashed: "84dfc831f4a4c1d352b9badc52b23ba59f1675abd9f591fe84c1bbbcaee4bafaeba8ea8ea49962e6f1dc5bec3640353cdc84134fc9fb3bea0a06fd4080f98637"},
            {value: "SpiderMan", hashed: "84bfd24a6df8554b3f71508238cfbb40e291a04de5c5deff7c750780be39317d416ff1cbe6d12fdd76f99c93cdbe4c7b1f382319ef7a4e504f019cb82645d1f8"},
            {value: "DoctorStrange", hashed: "93c4c076a56f655f5eacaa4eb44393ae618aa6f45b276d47f48b7a808ebd2156b2da5a7c5e8a97a96da189d33e5f9518997033bc2f568f3c8bcc9e6f4e86e605"}
        ]
    };

    it("should generate sha512", () => {
        for (const {value, hashed} of _ctx.pairs) {
            const cryptoJs = cry.algo.SHA512.create().update(Utf8.parse(value)).finalize().toString();
            const tonySha = new SHA512().update(Utf8.parse(value)).finalize().toString();
            const tonyHelper = sha512Helper(Utf8.parse(value)).toString();

            expect(tonyHelper).toEqual(hashed);
            expect(tonyHelper).toEqual(tonySha);
            expect(tonyHelper).toEqual(cryptoJs);
        }
    });
});
