import {Utf8, sha256Helper, SHA256} from "../../src";
import cry from "../crypto-js.js";

describe("SHA256", () => {

    const _ctx = {
        pairs: [
            {value: "IronMan", hashed: "78b13c80d8fdacdb876bdc14d57b9d8419830b004bf06aef2662c42bfc9b6a4e"},
            {value: "CaptainAmerica", hashed: "d98b594db81b9917a385c89d39382728061201e4634c9b5d67e372d4dc93c98b"},
            {value: "Thor", hashed: "2d7e4757dca1740ae496298b66041cbbf56e0403f4ea3d7eec48cac3c782f1ea"},
            {value: "SpiderMan", hashed: "9ac035dff5dde1c6faed3b9aeb3eef938193f84619ba4ef763c1a02dc844961b"},
            {value: "DoctorStrange", hashed: "3b126d104726bd7ccedf293c6dbc0322e49baebc2566960f965e2c53f7721feb"}
        ]
    };

    it("should generate sha256 correctly", () => {
        for (const {value, hashed} of _ctx.pairs) {
            const cryptoJs256 = cry.algo.SHA256.create().update(Utf8.parse(value)).finalize().toString();
            const tonySha256 = new SHA256().update(Utf8.parse(value)).finalize().toString();
            const tonySha256Helper = sha256Helper(Utf8.parse(value)).toString();

            expect(tonySha256Helper).toEqual(hashed);
            expect(tonySha256Helper).toEqual(tonySha256);
            expect(tonySha256Helper).toEqual(cryptoJs256);
        }
    });
});
