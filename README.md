# visionary-base64url

A cross-platform base64url converter for Node.js, browsers, and workers. environments. Tiny wrapper for `js-base64` which uses TextEncoder, atob, or Buffer based on runtime availability.

## Install

```bash
npm install visionary-base64url
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
