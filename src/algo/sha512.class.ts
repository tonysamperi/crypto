import {Hasher} from "../lib/hasher.class.js";
import {X64Word} from "../lib/x64-word.class.js";
import {X64WordArray} from "../lib/x64-word-array.class.js";

// Initialization and round constants tables
// eslint-disable-next-line @typescript-eslint/naming-convention
const K: X64Word[] = [
    new X64Word(1116352408, 3609767458),
    new X64Word(1899447441, 602891725),
    new X64Word(3049323471, 3964484399),
    new X64Word(3921009573, 2173295548),
    new X64Word(961987163, 4081628472),
    new X64Word(1508970993, 3053834265),
    new X64Word(2453635748, 2937671579),
    new X64Word(2870763221, 3664609560),
    new X64Word(3624381080, 2734883394),
    new X64Word(310598401, 1164996542),
    new X64Word(607225278, 1323610764),
    new X64Word(1426881987, 3590304994),
    new X64Word(1925078388, 4068182383),
    new X64Word(2162078206, 991336113),
    new X64Word(2614888103, 633803317),
    new X64Word(3248222580, 3479774868),
    new X64Word(3835390401, 2666613458),
    new X64Word(4022224774, 944711139),
    new X64Word(264347078, 2341262773),
    new X64Word(604807628, 2007800933),
    new X64Word(770255983, 1495990901),
    new X64Word(1249150122, 1856431235),
    new X64Word(1555081692, 3175218132),
    new X64Word(1996064986, 2198950837),
    new X64Word(2554220882, 3999719339),
    new X64Word(2821834349, 766784016),
    new X64Word(2952996808, 2566594879),
    new X64Word(3210313671, 3203337956),
    new X64Word(3336571891, 1034457026),
    new X64Word(3584528711, 2466948901),
    new X64Word(113926993, 3758326383),
    new X64Word(338241895, 168717936),
    new X64Word(666307205, 1188179964),
    new X64Word(773529912, 1546045734),
    new X64Word(1294757372, 1522805485),
    new X64Word(1396182291, 2643833823),
    new X64Word(1695183700, 2343527390),
    new X64Word(1986661051, 1014477480),
    new X64Word(2177026350, 1206759142),
    new X64Word(2456956037, 344077627),
    new X64Word(2730485921, 1290863460),
    new X64Word(2820302411, 3158454273),
    new X64Word(3259730800, 3505952657),
    new X64Word(3345764771, 106217008),
    new X64Word(3516065817, 3606008344),
    new X64Word(3600352804, 1432725776),
    new X64Word(4094571909, 1467031594),
    new X64Word(275423344, 851169720),
    new X64Word(430227734, 3100823752),
    new X64Word(506948616, 1363258195),
    new X64Word(659060556, 3750685593),
    new X64Word(883997877, 3785050280),
    new X64Word(958139571, 3318307427),
    new X64Word(1322822218, 3812723403),
    new X64Word(1537002063, 2003034995),
    new X64Word(1747873779, 3602036899),
    new X64Word(1955562222, 1575990012),
    new X64Word(2024104815, 1125592928),
    new X64Word(2227730452, 2716904306),
    new X64Word(2361852424, 442776044),
    new X64Word(2428436474, 593698344),
    new X64Word(2756734187, 3733110249),
    new X64Word(3204031479, 2999351573),
    new X64Word(3329325298, 3815920427),
    new X64Word(3391569614, 3928383900),
    new X64Word(3515267271, 566280711),
    new X64Word(3940187606, 3454069534),
    new X64Word(4118630271, 4000239992),
    new X64Word(116418474, 1914138554),
    new X64Word(174292421, 2731055270),
    new X64Word(289380356, 3203993006),
    new X64Word(460393269, 320620315),
    new X64Word(685471733, 587496836),
    new X64Word(852142971, 1086792851),
    new X64Word(1017036298, 365543100),
    new X64Word(1126000580, 2618297676),
    new X64Word(1288033470, 3409855158),
    new X64Word(1501505948, 4234509866),
    new X64Word(1607167915, 987167468),
    new X64Word(1816402316, 1246189591)
];
// eslint-disable-next-line @typescript-eslint/naming-convention
const W: X64Word[] = [];

// Compute constants
(function () {
    for (let i = 0; i < 80; i++) {
        W[i] = new X64Word(void 0, void 0);
    }
})();


export class SHA512 extends Hasher {
    private _hash: X64WordArray;

    constructor() {
        super({
            blockSize: 1024 / 32
        });
    }

    reset() {
        super.reset();
        this._hash = new X64WordArray([
            new X64Word(1779033703, 4089235720),
            new X64Word(3144134277, 2227873595),
            new X64Word(1013904242, 4271175723),
            new X64Word(2773480762, 1595750129),
            new X64Word(1359893119, 2917565137),
            new X64Word(2600822924, 725511199),
            new X64Word(528734635, 4215389547),
            new X64Word(1541459225, 327033209)
        ]);
    }

    protected _doFinalize() {
        const data = this._data;
        const dataWords = data.words;
        const nBitsTotal = this._nDataBytes * 8;
        const nBitsLeft = data.sigBytes * 8;
        dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
        dataWords[(nBitsLeft + 128 >>> 10 << 5) + 30] = Math.floor(nBitsTotal / 4294967296);
        dataWords[(nBitsLeft + 128 >>> 10 << 5) + 31] = nBitsTotal;
        data.sigBytes = dataWords.length * 4;
        this._process();

        return this._hash.toX32();
    }

    protected _doProcessBlock(m: number[], offset: number) {
        let ah = this._hash.words[0].high;
        let al = this._hash.words[0].low;
        let bh = this._hash.words[1].high;
        let bl = this._hash.words[1].low;
        let ch = this._hash.words[2].high;
        let cl = this._hash.words[2].low;
        let dh = this._hash.words[3].high;
        let dl = this._hash.words[3].low;
        let eh = this._hash.words[4].high;
        let el = this._hash.words[4].low;
        let fh = this._hash.words[5].high;
        let fl = this._hash.words[5].low;
        let gh = this._hash.words[6].high;
        let gl = this._hash.words[6].low;
        let hh = this._hash.words[7].high;
        let hl = this._hash.words[7].low;
        for (let i = 0; i < 80; i++) {
            let currentLow;
            let currentHi;
            if (i < 16) {
                currentHi = W[i].high = m[offset + i * 2] | 0;
                currentLow = W[i].low = m[offset + i * 2 + 1] | 0;
            }
            else {
                const gamma0x = W[i - 15];
                const gamma0xh = gamma0x.high;
                const gamma0xl = gamma0x.low;
                const gamma0h = (gamma0xh >>> 1 | gamma0xl << 31) ^ (gamma0xh >>> 8 | gamma0xl << 24) ^ gamma0xh >>> 7;
                const gamma0l = (gamma0xl >>> 1 | gamma0xh << 31) ^ (gamma0xl >>> 8 | gamma0xh << 24) ^ (gamma0xl >>> 7 | gamma0xh << 25);
                const gamma1x = W[i - 2];
                const gamma1xh = gamma1x.high;
                const gamma1xl = gamma1x.low;
                const gamma1h = (gamma1xh >>> 19 | gamma1xl << 13) ^ (gamma1xh << 3 | gamma1xl >>> 29) ^ gamma1xh >>> 6;
                const gamma1l = (gamma1xl >>> 19 | gamma1xh << 13) ^ (gamma1xl << 3 | gamma1xh >>> 29) ^ (gamma1xl >>> 6 | gamma1xh << 26);
                currentLow = gamma0l + W[i - 7].low;
                currentHi = gamma0h + W[i - 7].high + (currentLow >>> 0 < gamma0l >>> 0 ? 1 : 0);
                currentLow = currentLow + gamma1l;
                currentHi = currentHi + gamma1h + (currentLow >>> 0 < gamma1l >>> 0 ? 1 : 0);
                currentLow = currentLow + W[i - 16].low;
                currentHi = currentHi + W[i - 16].high + (currentLow >>> 0 < W[i - 16].low >>> 0 ? 1 : 0);
                W[i].high = currentHi;
                W[i].low = currentLow;
            }
            const chh = eh & fh ^ ~eh & gh;
            const chl = el & fl ^ ~el & gl;
            const majh = ah & bh ^ ah & ch ^ bh & ch;
            const majl = al & bl ^ al & cl ^ bl & cl;
            const sigma0h = (ah >>> 28 | al << 4) ^ (ah << 30 | al >>> 2) ^ (ah << 25 | al >>> 7);
            const sigma0l = (al >>> 28 | ah << 4) ^ (al << 30 | ah >>> 2) ^ (al << 25 | ah >>> 7);
            const sigma1h = (eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9);
            const sigma1l = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9);
            let t1l = hl + sigma1l;
            let t1h = hh + sigma1h + (t1l >>> 0 < hl >>> 0 ? 1 : 0);
            t1l = t1l + chl;
            t1h = t1h + chh + (t1l >>> 0 < chl >>> 0 ? 1 : 0);
            t1l = t1l + K[i].low;
            t1h = t1h + K[i].high + (t1l >>> 0 < K[i].low >>> 0 ? 1 : 0);
            t1l = t1l + currentLow;
            t1h = t1h + currentHi + (t1l >>> 0 < currentLow >>> 0 ? 1 : 0);
            const t2l = sigma0l + majl;
            const t2h = sigma0h + majh + (t2l >>> 0 < sigma0l >>> 0 ? 1 : 0);
            hh = gh;
            hl = gl;
            gh = fh;
            gl = fl;
            fh = eh;
            fl = el;
            el = dl + t1l | 0;
            eh = dh + t1h + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
            dh = ch;
            dl = cl;
            ch = bh;
            cl = bl;
            bh = ah;
            bl = al;
            al = t1l + t2l | 0;
            ah = t1h + t2h + (al >>> 0 < t1l >>> 0 ? 1 : 0) | 0;
        }
        this._hash.words[0].low = this._hash.words[0].low = this._hash.words[0].low + al;
        this._hash.words[0].high = this._hash.words[0].high + ah + (this._hash.words[0].low >>> 0 < al >>> 0 ? 1 : 0);
        this._hash.words[1].low = this._hash.words[1].low = this._hash.words[1].low + bl;
        this._hash.words[1].high = this._hash.words[1].high + bh + (this._hash.words[1].low >>> 0 < bl >>> 0 ? 1 : 0);
        this._hash.words[2].low = this._hash.words[2].low = this._hash.words[2].low + cl;
        this._hash.words[2].high = this._hash.words[2].high + ch + (this._hash.words[2].low >>> 0 < cl >>> 0 ? 1 : 0);
        this._hash.words[3].low = this._hash.words[3].low = this._hash.words[3].low + dl;
        this._hash.words[3].high = this._hash.words[3].high + dh + (this._hash.words[3].low >>> 0 < dl >>> 0 ? 1 : 0);
        this._hash.words[4].low = this._hash.words[4].low = this._hash.words[4].low + el;
        this._hash.words[4].high = this._hash.words[4].high + eh + (this._hash.words[4].low >>> 0 < el >>> 0 ? 1 : 0);
        this._hash.words[5].low = this._hash.words[5].low = this._hash.words[5].low + fl;
        this._hash.words[5].high = this._hash.words[5].high + fh + (this._hash.words[5].low >>> 0 < fl >>> 0 ? 1 : 0);
        this._hash.words[6].low = this._hash.words[6].low = this._hash.words[6].low + gl;
        this._hash.words[6].high = this._hash.words[6].high + gh + (this._hash.words[6].low >>> 0 < gl >>> 0 ? 1 : 0);
        this._hash.words[7].low = this._hash.words[7].low = this._hash.words[7].low + hl;
        this._hash.words[7].high = this._hash.words[7].high + hh + (this._hash.words[7].low >>> 0 < hl >>> 0 ? 1 : 0);
    }

}
