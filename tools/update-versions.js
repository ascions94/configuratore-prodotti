/*
    Aggiorna le versioni anti-cache (?v=...) in index.html
    con i primi 12 caratteri dello SHA-256 di ogni file.

    Uso: node tools/update-versions.js
*/

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const root = path.resolve(__dirname, "..");
const indexPath = path.join(root, "index.html");

const versionedFiles = ["style.css", "storage.js", "script.js"];

function fileVersion(fileName) {
    const content = fs.readFileSync(path.join(root, fileName));
    return crypto.createHash("sha256").update(content).digest("hex").slice(0, 12);
}

let html = fs.readFileSync(indexPath, "utf8");
const original = html;

for (const fileName of versionedFiles) {
    const pattern = new RegExp(fileName.replace(".", "\\.") + "\\?v=[0-9a-f]{12}", "g");
    const version = fileVersion(fileName);

    if (!pattern.test(html)) {
        console.error(`index.html: riferimento a ${fileName}?v=... non trovato`);
        process.exit(1);
    }

    html = html.replace(pattern, `${fileName}?v=${version}`);
    console.log(`${fileName}?v=${version}`);
}

if (html !== original) {
    fs.writeFileSync(indexPath, html, "utf8");
    console.log("index.html aggiornato");
} else {
    console.log("index.html già aggiornato");
}
