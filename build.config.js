import {execSync} from "child_process";
import {build} from "esbuild";
import fg from "fast-glob";
import {fileURLToPath} from "url";
import {cpSync, renameSync} from "fs";
import {resolve} from "path";
import {replaceInFile} from "replace-in-file";

async function duplicateTypings() {
    const dir = fileURLToPath(new URL(".", import.meta.url));
    cpSync("dist/raw-types", "dist/esm", {recursive: true});
    cpSync("dist/raw-types", "dist/cjs", {recursive: true});
    const dts = await fg(resolve(dir, "dist/cjs/**/*.d.ts"));
    const dcts = dts.map(f => {
        renameSync(f, f.replace(/\.d\.ts$/, ".d.cts"));
    });
    await replaceInFile({
        files: "dist/cjs/**/*",
        from: [
            /(from\s+["'].*?)(\.js)(["'])/g
        ],
        to: [
            (match, ...$) => {

                return $[0] + ".cjs" + $[2];
            }
        ]
    });
    console.log(`✅ ${dcts.length} typings copied!`);
}

async function doBuild() {
    const isProd = process.env.NODE_ENV === "production";

    execSync("tsc -p tsconfig.esm.json", {stdio: "inherit"});

    await build({
        entryPoints: ["dist/raw-esm/**/*.js"],
        outdir: "dist/esm",
        format: "esm",
        bundle: !1,
        minify: !1 // never minify as it's only a source to work on
    });

    await build({
        entryPoints: ["dist/raw-esm/index.js"],
        outfile: "dist/cjs/index.cjs",
        format: "cjs",
        bundle: !0,
        minify: isProd
    });

    await duplicateTypings();
}

try {
    doBuild();
}
catch (e) {
    console.error("Error");
}
