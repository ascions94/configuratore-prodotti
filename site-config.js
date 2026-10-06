/* =====================================================================
   SUBLIMAMI - DATI DEL NEGOZIO
   ---------------------------------------------------------------------
   Modifica SOLO questo file per aggiornare contatti e spedizioni:
   tutte le pagine del sito (Home, Spedizioni, Contatti, Chi siamo)
   leggono i dati da qui.

   - Scrivi i valori tra le virgolette "...".
   - Se un valore è vuoto "", sul sito compare l'etichetta
     "da completare" al suo posto.
   ===================================================================== */

window.SUBLIMAMI = {

    contatti: {
        // Indirizzo email, es. "ciao@sublimami.it"
        email: "infosublimami@gmail.com",

        // Numero WhatsApp con prefisso internazionale, solo cifre,
        // senza + e senza spazi. Es. per 333 123 4567 → "393331234567"
        whatsapp: "393342274606",

        // Nome del profilo Instagram, senza @. Es. "sublimami"
        instagram: "",

        // Nome del profilo TikTok, senza @. Es. "sublimami"
        tiktok: ""
    },

    spedizioni: {
        // Nome del corriere, es. "BRT" oppure "Poste Italiane"
        corriere: "InPost",

        // Costo della spedizione, es. "€5,90"
        costo: "€6,99",

        // Spedizione gratuita per ordini sopra questa cifra, es. "€49,99"
        // (lascia vuoto se non la offrite)
        gratisDa: "€49,99",

        // Giorni per preparare il prodotto, es. "2-3 giorni lavorativi"
        tempiProduzione: "2-3 giorni lavorativi",

        // Giorni del corriere, es. "1-3 giorni lavorativi"
        tempiConsegna: "1-3 giorni lavorativi"
    }
};
