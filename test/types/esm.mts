import { decodeBase64Url, encodeBase64Url } from "visionary-base64url";

const encoded: string = encodeBase64Url("test");
const decoded: string = decodeBase64Url(encoded);

void decoded;
