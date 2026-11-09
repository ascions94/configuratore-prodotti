/*
    ============================
    ARCHIVIO DATI CONFIGURATORE
    ============================

    Progetto e carrello contengono le foto caricate
    (data URL) e superano facilmente i ~5 MB di
    localStorage, causando QuotaExceededError.

    Qui li salviamo in IndexedDB, che offre molto
    più spazio. script.js legge i dati in modo
    sincrono all'avvio: per questo li precarichiamo
    e carichiamo script.js solo quando sono pronti.

    Uso nell'HTML:
    <script src="storage.js" data-app-src="script.js"></script>
*/

(function () {

    "use strict";

    const DB_NAME = "sublimami-configuratore";
    const STORE_NAME = "kv";

    /*
        Chiavi gestite: le stesse usate finora
        in localStorage, così i dati esistenti
        vengono recuperati e spostati.
    */
    const MANAGED_KEYS = [
        "mycustomConfigurator",
        "mycustomCart"
    ];

    /*
        Se IndexedDB non risponde entro questo tempo
        usiamo localStorage, per non bloccare la pagina.
    */
    const OPEN_TIMEOUT_MS = 3000;

    const loaderScript = document.currentScript;

    const cache = new Map();

    let database = null;
    let writeChain = Promise.resolve();
    const scheduledKeys = new Set();


    function openDatabase() {

        return new Promise(function (resolve, reject) {

            if (!window.indexedDB) {
                reject(new Error("IndexedDB non disponibile"));
                return;
            }

            const timer = setTimeout(function () {
                reject(new Error("IndexedDB non risponde"));
            }, OPEN_TIMEOUT_MS);

            let request;

            try {
                request = window.indexedDB.open(DB_NAME, 1);
            } catch (error) {
                clearTimeout(timer);
                reject(error);
                return;
            }

            request.onupgradeneeded = function () {
                request.result.createObjectStore(STORE_NAME);
            };

            request.onsuccess = function () {
                clearTimeout(timer);
                resolve(request.result);
            };

            request.onerror = function () {
                clearTimeout(timer);
                reject(request.error);
            };
        });
    }


    function runRequest(mode, createRequest) {

        return new Promise(function (resolve, reject) {

            const transaction =
                database.transaction(STORE_NAME, mode);

            const request =
                createRequest(transaction.objectStore(STORE_NAME));

            transaction.oncomplete = function () {
                resolve(request.result);
            };

            transaction.onerror = function () {
                reject(transaction.error || request.error);
            };

            transaction.onabort = function () {
                reject(transaction.error || request.error);
            };
        });
    }


    function idbGet(key) {
        return runRequest("readonly", function (store) {
            return store.get(key);
        });
    }

    function idbSet(key, value) {
        return runRequest("readwrite", function (store) {
            return store.put(value, key);
        });
    }

    function idbDelete(key) {
        return runRequest("readwrite", function (store) {
            return store.delete(key);
        });
    }


    function readLegacy(key) {
        try {
            return window.localStorage.getItem(key);
        } catch (error) {
            return null;
        }
    }

    function removeLegacy(key) {
        try {
            window.localStorage.removeItem(key);
        } catch (error) {
            /* Nessun problema: resta solo occupato. */
        }
    }

    function writeLegacy(key, value) {
        try {
            if (value === null) {
                window.localStorage.removeItem(key);
            } else {
                window.localStorage.setItem(key, value);
            }
        } catch (error) {
            console.warn(
                "Impossibile salvare i dati del configuratore:",
                error
            );
        }
    }


    /*
        Le scritture vengono messe in coda e unite:
        se un valore cambia più volte prima di essere
        scritto, salviamo soltanto l'ultimo.
    */
    function scheduleWrite(key) {

        if (scheduledKeys.has(key)) {
            return;
        }

        scheduledKeys.add(key);

        writeChain = writeChain
            .then(function () {

                scheduledKeys.delete(key);

                const value =
                    cache.has(key) ? cache.get(key) : null;

                return value === null
                    ? idbDelete(key)
                    : idbSet(key, value);
            })
            .catch(function (error) {
                console.warn(
                    "Impossibile salvare i dati del configuratore:",
                    error
                );
            });
    }


    async function preload() {

        try {
            database = await openDatabase();
        } catch (error) {
            console.warn(
                "IndexedDB non disponibile, uso localStorage:",
                error
            );
            database = null;
        }

        for (const key of MANAGED_KEYS) {

            const legacyValue = readLegacy(key);

            if (!database) {
                if (legacyValue !== null) {
                    cache.set(key, legacyValue);
                }
                continue;
            }

            let value = null;

            try {
                value = await idbGet(key);
            } catch (error) {
                console.warn(
                    "Impossibile leggere i dati del configuratore:",
                    error
                );
            }

            if (value === undefined) {
                value = null;
            }

            /*
                Primo avvio dopo l'aggiornamento:
                spostiamo i dati da localStorage.
            */
            if (value === null && legacyValue !== null) {

                value = legacyValue;

                try {
                    await idbSet(key, legacyValue);
                    removeLegacy(key);
                } catch (error) {
                    console.warn(
                        "Impossibile spostare i dati salvati:",
                        error
                    );
                }

            } else if (value !== null && legacyValue !== null) {

                /* Già spostati: liberiamo localStorage. */
                removeLegacy(key);
            }

            if (value !== null) {
                cache.set(key, value);
            }
        }
    }


    window.appStorage = {

        getItem: function (key) {
            return cache.has(key) ? cache.get(key) : null;
        },

        setItem: function (key, value) {

            const text = String(value);

            cache.set(key, text);

            if (database) {
                scheduleWrite(key);
            } else {
                writeLegacy(key, text);
            }
        },

        removeItem: function (key) {

            cache.delete(key);

            if (database) {
                scheduleWrite(key);
            } else {
                writeLegacy(key, null);
            }
        },

        /*
            Attende che tutte le scritture siano
            completate (es. prima di lasciare la pagina
            per andare al checkout).
        */
        flush: function () {
            return writeChain;
        }
    };


    function loadApp() {

        const appSrc =
            loaderScript &&
            loaderScript.dataset.appSrc;

        if (!appSrc) {
            console.error(
                "storage.js: manca l'attributo data-app-src."
            );
            return;
        }

        const appScript = document.createElement("script");

        appScript.src = appSrc;
        appScript.async = false;

        document.body.appendChild(appScript);
    }


    preload()
        .catch(function (error) {
            console.warn(
                "Errore nel caricamento dei dati salvati:",
                error
            );
        })
        .then(loadApp);

})();
