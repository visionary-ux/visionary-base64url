# visionary-base64url

![NPM version](https://img.shields.io/npm/v/visionary-base64url?color=beige) ![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/visionary-ux/visionary-base64url/.github%2Fworkflows%2Fci-cd-workflow.yml?branch=master) ![NPM bundle size](https://img.shields.io/bundlephobia/minzip/visionary-base64url?color=blue) ![NPM Downloads](https://img.shields.io/npm/d18m/visionary-base64url?color=lightgray)

A cross-platform base64url converter for Node.js, web browsers, and worker environments. Tiny wrapper for `js-base64` which leverages `TextEncoder`, `atob`, or `Buffer` based on runtime availability.

## Install

```bash
npm install visionary-base64url
yarn add visionary-base64url
```

## Usage

### Encode a URL-safe Base64

```ts
import { encodeBase64Url } from "visionary-base64url";

const encoded = encodeBase64Url("The quick brown fox jumps over the lazy dog.");

console.log(encoded);
// -> VGhlIHF1aWNrIGJyb3duIGZveCBqdW1wcyBvdmVyIHRoZSBsYXp5IGRvZy4
```

### Decode a Base64URL

```ts
import { decodeBase64Url } from "visionary-base64url";

const decoded = decodeBase64Url("aHR0cHM6Ly93d3cuc3BhY2V4LmNvbS92ZWhpY2xlcy9zdGFyc2hpcA");

console.log(decoded);
// -> https://www.spacex.com/vehicles/starship
```
