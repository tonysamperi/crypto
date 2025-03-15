import {build} from "esbuild";

async function doBuild() {

    await build({
        entryPoints: ["./test/crypto-js.ts"],
        outdir: "test",
        format: "cjs",
        outExtension: {".js": ".cjs"},
        bundle: !0,
        minify: !1 // never minify as it's only a source to work on
    });

    await build({
        entryPoints: ["./test/crypto-js.ts"],
        outdir: "test",
        format: "esm",
        outExtension: {".js": ".mjs"},
        bundle: !0,
        minify: !1 // never minify as it's only a source to work on
    });

}

try {
    doBuild();
}
catch (e) {
    console.error("Error");
}
