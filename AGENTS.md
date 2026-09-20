# SubliMaMi - Regole di sviluppo

## Regole generali

- Prima di modificare codice esistente, analizzane le dipendenze e gli utilizzi.
- Preferire modifiche piccole e localizzate.
- Non effettuare refactoring generali se non esplicitamente richiesti.
- Non eliminare funzionalità esistenti senza autorizzazione.
- Evitare duplicazioni di logica quando esiste già una funzione utilizzabile.
- Dopo ogni modifica verificare possibili regressioni sulle funzionalità correlate.

## Desktop e mobile

- Il breakpoint mobile principale è 600px.
- Le modifiche richieste esclusivamente per mobile non devono alterare il comportamento desktop.
- Desktop e mobile condividono lo stesso stato del configuratore.
- Non modificare il posizionamento attuale dei mockup T-shirt o dell'area stampabile senza esplicita richiesta.
- Il centraggio mobile della T-shirt e dell'area stampabile è stato calibrato manualmente e deve essere preservato.

## Prodotti

Il configuratore gestisce:

- Cuscino 40x40 cm.
- T-Shirt.
- Portachiavi 4.5x4.5 cm.

Le personalizzazioni dei diversi prodotti devono rimanere indipendenti.

## T-Shirt

- Bianca e nera hanno stati di personalizzazione separati.
- Fronte e retro hanno stati indipendenti.
- Il cambio colore non deve perdere le personalizzazioni dell'altro colore.
- Il cambio fronte/retro non deve perdere le personalizzazioni dell'altro lato.
- I formati di stampa disponibili sono verticale 20x30 cm e orizzontale 30x20 cm.
- Lo zoom dell'anteprima non deve modificare le dimensioni reali della personalizzazione.
- Non alterare la relazione geometrica tra mockup, area stampabile, immagini e testi.

## Immagini e testi

- Sono supportate immagini multiple.
- Sono supportati testi multipli.
- Devono continuare a funzionare selezione, drag, resize, rotazione, flip, livelli, visibilità, duplicazione ed eliminazione.
- Le dimensioni visualizzate in centimetri devono continuare a rappresentare le dimensioni reali di stampa.
- Non modificare il sistema di coordinate senza verificare tutte le funzioni che dipendono da esso.

## Undo / Redo

- Le modifiche dell'editor devono restare compatibili con undo/redo.
- HISTORY\_LIMIT deve rimanere 20 salvo richiesta esplicita.
- Evitare snapshot duplicati o registrati nel momento sbagliato.

## Carrello

- Non modificare il sistema del carrello se non richiesto.
- La T-shirt usa rendering Canvas diretto per le anteprime del carrello: non sostituirlo con html2canvas.
- Cuscino e portachiavi possono continuare a utilizzare html2canvas.
- Le personalizzazioni fronte/retro della T-shirt devono essere conservate correttamente nel carrello.
- Colore, taglia e formato devono rimanere associati correttamente all'articolo.

## Persistenza

- Il configuratore utilizza localStorage.
- Esiste attualmente un problema noto di QuotaExceededError dovuto alla quantità di dati salvati.
- Non tentare di risolverlo durante attività non correlate.
- Eventuali modifiche alla struttura dello stato devono mantenere compatibilità con i dati esistenti quando possibile.

## Git

- Prima di modifiche importanti verificare lo stato Git.
- Non eseguire commit, push, reset, checkout o altre operazioni Git distruttive senza esplicita autorizzazione.
- Non modificare la cronologia Git.

## Metodo di lavoro

Quando viene richiesta una modifica:

1. Individuare prima il codice esistente coinvolto.
2. Verificare se esiste già una funzione riutilizzabile.
3. Descrivere brevemente il piano.
4. Applicare la modifica più piccola possibile.
5. Controllare errori JavaScript evidenti.
6. Indicare esattamente quali file sono stati modificati.
7. Riassumere cosa è cambiato e cosa deve essere testato manualmente.
