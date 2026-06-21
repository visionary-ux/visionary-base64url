import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  dts: true,
  entry: ["src/index.ts"],
  external: ["js-base64"],
  format: ["esm", "cjs"],
  outDir: "dist",
  outExtension: ({ format }) => ({
    js: format === "esm" ? ".js" : ".cjs",
  }),
  sourcemap: true,
  splitting: false,
  target: "es2020",
});
