const assert = require("node:assert/strict");

const check = ({ encodeBase64Url, decodeBase64Url }) => {
  assert.equal(encodeBase64Url("ok"), "b2s");
  assert.equal(decodeBase64Url("b2s"), "ok");
};

(async () => {
  check(require("./dist/index.cjs"));
  check(await import("./dist/index.js"));
  check(require("visionary-base64url"));
  check(await import("visionary-base64url"));

  console.log("package smoke ok");
})();
