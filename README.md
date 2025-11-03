# visionary-base64url

[![NPM version](https://img.shields.io/npm/v/visionary-base64url?color=beige)](https://www.npmjs.com/package/visionary-base64url) [![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/visionary-ux/visionary-base64url/.github%2Fworkflows%2Fci-cd-workflow.yml?branch=master)](https://github.com/visionary-ux/visionary-base64url/actions) [![NPM bundle size](https://img.shields.io/bundlephobia/minzip/visionary-base64url?color=blue)](https://bundlephobia.com/package/visionary-base64url) [![NPM Downloads](https://img.shields.io/npm/d18m/visionary-base64url?color=lightgray)](https://www.npmjs.com/package/visionary-base64url?activeTab=versions)

A lightweight `base64url` converter for Node.js, web browsers, and worker environments. Built on `js-base64` for broad compatibility and automatic runtime detection.

## Install

```bash
npm install visionary-base64url

yarn add visionary-base64url
```

## Usage

### Encode text as base64url

```ts
import { encodeBase64Url } from "visionary-base64url";

const encoded = encodeBase64Url("The quick brown fox jumps over the lazy dog.");

console.log(encoded);
// VGhlIHF1aWNrIGJyb3duIGZveCBqdW1wcyBvdmVyIHRoZSBsYXp5IGRvZy4
```

### Decode base64url-encoded string to plain text

```ts
import { decodeBase64Url } from "visionary-base64url";

const decoded = decodeBase64Url("aHR0cHM6Ly93d3cuc3BhY2V4LmNvbS92ZWhpY2xlcy9zdGFyc2hpcA");

console.log(decoded);
// https://www.spacex.com/vehicles/starship
```

## What is base64url?

`base64url` is a web-safe variant of Base64 encoding. It replaces problematic characters (`+`, `=`, `/`) with URL and filename-friendly alternatives (`_`, `-`), as defined in [RFC 4648](https://datatracker.ietf.org/doc/html/rfc4648#section-5).

## Why use base64url?

Use `base64url` for portable, URL-safe encoding of text or JSON data, making it ideal for environments where standard Base64 might break things. Safely drop it into contexts like:

- **URL paths and query parameters** — embed data directly in URLs
- **Filesystem-friendly** — safe for filenames and blob storage keys
- **Shell scripts and CI pipelines** — avoid quoting or escaping issues in command-line tools and automation workflows
- **JWTs and web tokens** — compliant with RFC 7515 (JWS compact serialization)
