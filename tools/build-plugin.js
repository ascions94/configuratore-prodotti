/*
    Prepara il plugin WordPress pronto da installare.

    1. Aggiorna le versioni anti-cache nelle pagine HTML
    2. Copia il plugin in dist/sublimami-configuratore/
    3. Copia il configuratore (personalizza.html, script.js, storage.js,
       style.css, assets/) in dist/sublimami-configuratore/app/
    4. Crea dist/sublimami-configuratore.zip
       (WordPress → Plugin → Aggiungi nuovo → Carica plugin)

    Uso: node tools/build-plugin.js
*/

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const pluginName = "sublimami-configuratore";
const pluginSource = path.join(root, "wordpress-plugin", pluginName);
const distDir = path.join(root, "dist");
const pluginTarget = path.join(distDir, pluginName);
const zipPath = path.join(distDir, pluginName + ".zip");

const appFiles = ["personalizza.html", "script.js", "storage.js", "style.css"];
const appDirs = ["assets"];

execFileSync(process.execPath, [path.join(__dirname, "update-versions.js")], { stdio: "inherit" });

fs.rmSync(pluginTarget, { recursive: true, force: true });
fs.rmSync(zipPath, { force: true });
fs.mkdirSync(distDir, { recursive: true });

fs.cpSync(pluginSource, pluginTarget, { recursive: true });

const appTarget = path.join(pluginTarget, "app");
fs.mkdirSync(appTarget, { recursive: true });

for (const fileName of appFiles) {
    fs.copyFileSync(path.join(root, fileName), path.join(appTarget, fileName));
}

for (const dirName of appDirs) {
    fs.cpSync(path.join(root, dirName), path.join(appTarget, dirName), { recursive: true });
}

/* tar di Windows 10+ (bsdtar) e di macOS/Linux crea zip con -a */
execFileSync("tar", ["-a", "-c", "-f", pluginName + ".zip", pluginName], { cwd: distDir, stdio: "inherit" });

const sizeMb = (fs.statSync(zipPath).size / 1048576).toFixed(1);
console.log(`Plugin pronto: dist/${pluginName}.zip (${sizeMb} MB)`);
