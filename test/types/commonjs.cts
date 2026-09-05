import base64Url = require("visionary-base64url");

const encoded: string = base64Url.encodeBase64Url("test");
const decoded: string = base64Url.decodeBase64Url(encoded);

void decoded;
