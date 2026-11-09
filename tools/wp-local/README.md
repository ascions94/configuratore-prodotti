# WordPress locale di prova

Avvia un WordPress con WooCommerce e il plugin SubliMaMi, senza installare PHP o database
(usa [WordPress Playground](https://wordpress.github.io/wordpress-playground/)).

```bash
node tools/build-plugin.js
npx @wp-playground/cli@3.1.61 server --port=9400 --mount=dist/sublimami-configuratore:/wordpress/wp-content/plugins/sublimami-configuratore --blueprint=tools/wp-local/blueprint.json
```

- Configuratore: http://127.0.0.1:9400/personalizza/
- Amministrazione: http://127.0.0.1:9400/wp-admin/ (utente `admin`, password `password`)

I dati non vengono salvati: a ogni riavvio il sito riparte da zero.
Il pagamento disponibile è "Pagamento alla consegna", attivato solo per le prove.
