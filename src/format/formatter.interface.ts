import { CipherParams } from '../lib/cipher-params.class.js';

export interface Formatter {
    stringify: (cipherParams: CipherParams) => string;

    parse: (paramsStr: string) => CipherParams;
}
