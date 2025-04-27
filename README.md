# Krypto
TypeScript library of crypto standards, derived from [crypto-js](https://github.com/brix/crypto-js)

[![MIT Licence][licence-image]][licence] 
[![NPM version][npm-version-image]][npm-url] 
[![Size][size-url]][size-unpkg-url]
![PRs welcome][contributing-image]
[![Build Status][gh-actions-image]][gh-actions-url]

I've been using crypto-js, but it was recently discontinued.
It's not for that reason, but let's be honest: you always hated it for its typings.
Man, seriously, a nightmare if you were in modern projects.
I've been recently exploring ESM modules, so I've been making all of my libs **tree-shakeable**.
Crypto-js is a not-so-tiny brick. CommonJS is ok, but there was just no way of not having those 200KBs in your bundles.

Well **not anymore**!!!

The syntax is very similar to the one in crypto-js, except that now all the entities are classes, so it's even more versatile.
Little downside, big upside IMHO.
The downside is that I had to use other names for the helpers offered by crypto-js such as SHA1, SHA256, etc.

Nothing impossible in any case: how SHA1 is the hasher class (that you can optionally extend), while the helper is just called `sha1Helper`.

It's easy, isn't it?

## You can import whatever you want from the root

```js
import {sha256Helper, Utf8} from "@tonysamperi/crypto";

const myHash = sha256Helper(Utf8.parse(value)).toString();
```

## Preview releases
With v6 I introduced a new release tag `next`.
These versions are basically release candidates that can be tried out before they get released.
The next version tag gets cleared out automatically upon release of the latest stable version.

The beta releases instead, like it's always been, represent **unstable** releases, and they're subject to dramatic changes.

## Features

I started with a few features that I personally need, but I will migrate others once a while.
One that I have in mind is TripleDES.

### ALGORITHMS (including helpers to simplify usage)

* AES
* DES
* MD5
* SHA1
* SHA256
* SHA512
* TripleDES

### KDF

* pbkdf2
* evpkdf

### ENCODING

* base64
* hex
* latin1
* utf16
* utf8

### MODE

* CBC
* CTR
* ECB

### PADDING

* nopadding
* pkcs7
* zeropadding

## Usage

### Via npm

`npm i @tonysamperi/crypto --save`

then

```typescript
import {Hex} from "ts-luxon";

const myWord = Hex.parse("1a2b3c");
```

## THANKS TO

[Evan Vosberg](https://github.com/brix) for creating and maintaining crypto-js

# DOCS

COMING SOON

---

[//]: # (keep these ordered alphabetically)

[contributing-image]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg

[gh-actions-url]: https://github.com/tonysamperi/krypto/actions/workflows/test.yml/badge.svg
[gh-actions-image]: https://github.com/tonysamperi/krypto/workflows/Test/badge.svg?branch=master

[licence-image]: https://img.shields.io/badge/license-MIT-blue.svg
[licence]: LICENCE

[npm-url]: https://npmjs.org/package/@tonysamperi%3Dkrypto
[npm-version-image]: https://badge.fury.io/js/@tonysamperi%3Dkrypto.svg

[size-url]: https://img.shields.io/bundlephobia/minzip/@tonysamperi/krypto
[size-unpkg-url]: https://unpkg.com/@tonysamperi/krypto@latest/dist/cjs/index.cjs
