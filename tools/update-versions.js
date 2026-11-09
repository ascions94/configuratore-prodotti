/*
    Aggiorna le versioni anti-cache (?v=...) in tutte le pagine HTML
    del sito con i primi 12 caratteri dello SHA-256 di ogni file.

    Uso: node tools/update-versions.js
*/

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const root = path.resolve(__dirname, "..");

const versionedFiles = [
    "style.css",
    "storage.js",
    "script.js",
    "home.css",
    "home.js",
    "site-config.js"
];

/* La pagina del configuratore deve sempre caricare questi file. */
const requiredInConfigurator = ["style.css", "storage.js", "script.js"];

function fileVersion(fileName) {
    const content = fs.readFileSync(path.join(root, fileName));
    return crypto.createHash("sha256").update(content).digest("hex").slice(0, 12);
}

const versions = {};

for (const fileName of versionedFiles) {
    if (fs.existsSync(path.join(root, fileName))) {
        versions[fileName] = fileVersion(fileName);
    }
}

const pages = fs
    .readdirSync(root)
    .filter(function (name) {
        return name.endsWith(".html");
    });

for (const page of pages) {
    const pagePath = path.join(root, page);
    let html = fs.readFileSync(pagePath, "utf8");
    const original = html;

    for (const [fileName, version] of Object.entries(versions)) {
        /* Solo riferimenti al file vero: preceduti da " o / */
        const pattern = new RegExp(
            '(["/])' + fileName.replace(/\./g, "\\.") + "\\?v=[\\w.-]+",
            "g"
        );

        html = html.replace(pattern, `$1${fileName}?v=${version}`);
    }

    if (page === "personalizza.html") {
        for (const fileName of requiredInConfigurator) {
            if (!html.includes(`${fileName}?v=${versions[fileName]}`)) {
                console.error(`${page}: riferimento a ${fileName}?v=... non trovato`);
                process.exit(1);
            }
        }
    }

    if (html !== original) {
        fs.writeFileSync(pagePath, html, "utf8");
        console.log(`${page} aggiornato`);
    }
}

for (const [fileName, version] of Object.entries(versions)) {
    console.log(`${fileName}?v=${version}`);
}
