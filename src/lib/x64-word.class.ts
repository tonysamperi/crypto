export class X64Word {
    constructor(public high: number,
                public low: number) {
    }

    not(): X64Word {
        return new X64Word(~this.high, ~this.low);
    }

    and(word: X64Word): X64Word {
        return new X64Word(this.high & word.high, this.low & word.low);
    }

    or(word: X64Word): X64Word {
        return new X64Word(this.high | word.high, this.low | word.low);
    }

    xor(word: X64Word): X64Word {
        return new X64Word(this.high ^ word.high, this.low ^ word.low);
    }

    shiftL(n: number): X64Word {
        if (n < 32) {
            return new X64Word((this.high << n) | (this.low >>> (32 - n)), this.low << n);
        }
        else {
            return new X64Word(this.low << (n - 32), 0);
        }
    }

    shiftR(n: number): X64Word {
        if (n < 32) {
            return new X64Word(this.high >>> n, (this.low >>> n) | (this.high << (32 - n)));
        }
        else {
            return new X64Word(0, this.high >>> (n - 32));
        }
    }

    rotL(n: number): X64Word {
        return this.shiftL(n).or(this.shiftR(64 - n));
    }

    rotR(n: number): X64Word {
        return this.shiftR(n).or(this.shiftL(64 - n));
    }

    add(word: X64Word): X64Word {
        const low = (this.low + word.low) | 0;
        const carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
        const high = (this.high + word.high + carry) | 0;
        return new X64Word(high, low);
    }
}
