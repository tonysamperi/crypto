# crypto
TypeScript library of crypto standards.

[![MIT License][license-image]][license] [![Build Status][gh-actions-image]][gh-actions-url] ![[NPM version][npm-version-image]][npm-url] ![PRs welcome][contributing-image]
[![Size](https://img.shields.io/bundlephobia/minzip/@tonysamperi/crypto)](https://unpkg.com/@tonysamperi/crypto@latest/dist/cjs/index.cjs)

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

### HASHING

* md5
* sha1
* sha256
* sha512

### KDF

* pbkdf2
* evpkdf

### ENCODING

* latin1
* utf8
* hex
* base64

### MODE

* ECB
* CBC
* CTR

### PADDING

* pkcs7
* zeropadding
* nopadding

## Usage

### Via npm

`npm i @tonysamperi/crypto --save`

then

```typescript
import {Hex} from "ts-luxon";

const myWord = Hex.parse("1a2b3c");
```

# DOCS

COMING SOON

---

## Development

[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
[license]: LICENSE

[gh-actions-url]: https://github.com/tonysamperi/crypto/actions?query=workflow%3A%22Test%22
[gh-actions-image]: https://github.com/tonysamperi/crypto/workflows/Test/badge.svg?branch=master

[npm-url]: https://npmjs.org/package/@tonysamperi/crypto
[npm-version-image]: https://badge.fury.io/js/@tonysamperi/crypto.svg

[doc-url]: https://tonysamperi.github.io/crypto/

[contributing-image]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
