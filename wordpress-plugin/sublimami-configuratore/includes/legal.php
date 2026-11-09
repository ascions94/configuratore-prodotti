<?php
/**
 * Dati del venditore e testi legali.
 *
 * - WooCommerce → Impostazioni → Generali: "Ragione sociale" e "Partita IVA"
 *   (mostrati nel footer del configuratore insieme all'indirizzo del negozio).
 * - Bozze delle pagine "Condizioni generali di vendita" e "Informativa privacy
 *   e cookie": vanno completate e fatte verificare prima di pubblicarle.
 *   Quando vengono pubblicate diventano automaticamente la pagina dei termini
 *   di WooCommerce (casella da accettare al checkout) e la pagina privacy.
 */

defined( 'ABSPATH' ) || exit;

/*
 * CAMPI NELLE IMPOSTAZIONI DI WOOCOMMERCE
 */
add_filter(
	'woocommerce_general_settings',
	function ( $settings ) {
		$fields = array(
			array(
				'title' => 'Dati del venditore (SubliMaMi)',
				'desc'  => 'Mostrati nel configuratore insieme all\'indirizzo del negozio. Per legge la partita IVA deve essere visibile sul sito.',
				'type'  => 'title',
				'id'    => 'sublimami_seller_options',
			),
			array(
				'title'    => 'Ragione sociale',
				'desc_tip' => 'Es. "SubliMaMi di Mario Rossi".',
				'id'       => 'sublimami_company_name',
				'type'     => 'text',
				'default'  => '',
			),
			array(
				'title'   => 'Partita IVA',
				'id'      => 'sublimami_vat_number',
				'type'    => 'text',
				'default' => '',
			),
			array(
				'type' => 'sectionend',
				'id'   => 'sublimami_seller_options',
			),
		);

		return array_merge( $settings, $fields );
	}
);


/*
 * Riga con i dati del venditore, es.
 * "SubliMaMi di Mario Rossi – Via Roma 1, 00100 Roma – P.IVA 01234567890".
 */
function sublimami_get_seller_line() {
	$name    = trim( (string) get_option( 'sublimami_company_name', '' ) );
	$vat     = trim( (string) get_option( 'sublimami_vat_number', '' ) );
	$address = trim( (string) get_option( 'woocommerce_store_address', '' ) );
	$city    = trim( trim( (string) get_option( 'woocommerce_store_postcode', '' ) ) . ' ' . trim( (string) get_option( 'woocommerce_store_city', '' ) ) );

	$parts = array( '' !== $name ? $name : get_bloginfo( 'name' ) );

	$full_address = implode( ', ', array_filter( array( $address, $city ) ) );

	if ( '' !== $full_address ) {
		$parts[] = $full_address;
	}

	if ( '' !== $vat ) {
		$parts[] = 'P.IVA ' . $vat;
	}

	return wp_strip_all_tags( implode( ' – ', $parts ) );
}


/* URL di una pagina solo se è pubblicata (le bozze non vanno mostrate ai clienti). */
function sublimami_get_published_page_url( $page_id ) {
	$page_id = (int) $page_id;

	if ( ! $page_id || 'publish' !== get_post_status( $page_id ) ) {
		return '';
	}

	return (string) get_permalink( $page_id );
}


/*
 * BOZZE DEI TESTI LEGALI
 */
function sublimami_get_legal_pages() {
	$pages = get_option( 'sublimami_legal_pages', array() );
	return is_array( $pages ) ? $pages : array();
}


function sublimami_maybe_create_legal_drafts() {
	$pages = sublimami_get_legal_pages();

	$definitions = array(
		'terms'   => array(
			'title'   => 'Condizioni generali di vendita',
			'slug'    => 'condizioni-di-vendita',
			'content' => sublimami_terms_template(),
		),
		'privacy' => array(
			'title'   => 'Informativa privacy e cookie',
			'slug'    => 'privacy',
			'content' => sublimami_privacy_template(),
		),
	);

	foreach ( $definitions as $key => $definition ) {
		if ( ! empty( $pages[ $key ] ) && get_post( $pages[ $key ] ) ) {
			continue;
		}

		$page_id = wp_insert_post(
			array(
				'post_type'    => 'page',
				'post_status'  => 'draft',
				'post_title'   => $definition['title'],
				'post_name'    => $definition['slug'],
				'post_content' => $definition['content'],
			)
		);

		if ( $page_id && ! is_wp_error( $page_id ) ) {
			$pages[ $key ] = (int) $page_id;
		}
	}

	update_option( 'sublimami_legal_pages', $pages );
}


/*
 * Quando una bozza viene pubblicata la colleghiamo a WooCommerce / WordPress.
 */
add_action(
	'transition_post_status',
	function ( $new_status, $old_status, $post ) {
		if ( 'publish' !== $new_status || 'page' !== $post->post_type ) {
			return;
		}

		$pages = sublimami_get_legal_pages();

		if ( ! empty( $pages['terms'] ) && (int) $pages['terms'] === (int) $post->ID ) {
			update_option( 'woocommerce_terms_page_id', (int) $post->ID );
		}

		if ( ! empty( $pages['privacy'] ) && (int) $pages['privacy'] === (int) $post->ID ) {
			update_option( 'wp_page_for_privacy_policy', (int) $post->ID );
		}
	},
	10,
	3
);


/*
 * Converte una lista di blocchi semplici in contenuto per l'editor a blocchi.
 * array( 'h2', 'Titolo' ) / array( 'p', 'Testo' ) / array( 'ul', array( 'voce', ... ) )
 */
function sublimami_blocks( array $blocks ) {
	$html = '';

	foreach ( $blocks as $block ) {
		list( $type, $content ) = $block;

		if ( 'h2' === $type ) {
			$html .= "<!-- wp:heading -->\n<h2 class=\"wp-block-heading\">" . esc_html( $content ) . "</h2>\n<!-- /wp:heading -->\n\n";
		} elseif ( 'ul' === $type ) {
			$items = '';
			foreach ( $content as $item ) {
				$items .= "<!-- wp:list-item -->\n<li>" . esc_html( $item ) . "</li>\n<!-- /wp:list-item -->\n";
			}
			$html .= "<!-- wp:list -->\n<ul class=\"wp-block-list\">" . $items . "</ul>\n<!-- /wp:list -->\n\n";
		} else {
			$html .= "<!-- wp:paragraph -->\n<p>" . esc_html( $content ) . "</p>\n<!-- /wp:paragraph -->\n\n";
		}
	}

	return $html;
}


function sublimami_draft_notice() {
	return array( 'p', 'BOZZA DA COMPLETARE: sostituisci tutte le parti tra [parentesi quadre] e fai verificare il testo da un professionista o da un servizio come iubenda prima di pubblicarlo. Questo modello non è una consulenza legale.' );
}


function sublimami_terms_template() {
	return sublimami_blocks(
		array(
			sublimami_draft_notice(),

			array( 'h2', '1. Venditore' ),
			array( 'p', 'I prodotti sono venduti da [RAGIONE SOCIALE], con sede in [INDIRIZZO COMPLETO], Partita IVA [PARTITA IVA], email [EMAIL], PEC [PEC, se presente].' ),

			array( 'h2', '2. Oggetto' ),
			array( 'p', 'Le presenti condizioni regolano la vendita online di prodotti personalizzati (cuscini, T-shirt, portachiavi) realizzati secondo le foto e i testi scelti dal cliente con il configuratore presente sul sito.' ),

			array( 'h2', '3. Ordine e conclusione del contratto' ),
			array( 'p', 'Il contratto si conclude quando il cliente completa il pagamento e riceve l\'email di conferma dell\'ordine. Prima di confermare, il cliente può controllare l\'anteprima della personalizzazione, il riepilogo e il prezzo totale.' ),

			array( 'h2', '4. Prezzi e pagamento' ),
			array( 'p', 'I prezzi sono in euro e comprendono l\'IVA. Le eventuali spese di spedizione sono indicate prima del pagamento. Il pagamento avviene online tramite Stripe (carte di credito e debito, Apple Pay, Google Pay e altri metodi mostrati al checkout): il venditore non riceve né conserva i dati della carta.' ),

			array( 'h2', '5. Contenuti caricati dal cliente' ),
			array( 'p', 'Il cliente dichiara di avere tutti i diritti sulle immagini e sui testi che carica (diritti d\'autore, marchi, diritti di immagine delle persone ritratte) e si assume la responsabilità del loro utilizzo. Il venditore può rifiutare ordini con contenuti illeciti, offensivi o che violano diritti di terzi, rimborsando l\'importo pagato.' ),

			array( 'h2', '6. Resa di stampa' ),
			array( 'p', 'L\'anteprima è indicativa: i colori possono variare leggermente tra schermo e prodotto stampato. La qualità della stampa dipende dalla risoluzione delle foto caricate; il configuratore stampa le foto alle dimensioni mostrate in centimetri.' ),

			array( 'h2', '7. Produzione e consegna' ),
			array( 'p', 'Ogni prodotto viene realizzato su ordinazione in [NUMERO] giorni lavorativi dalla conferma. La consegna avviene tramite [CORRIERE] in [ZONE DI SPEDIZIONE] in circa [NUMERO] giorni lavorativi. Per ricevere i prodotti prima di Natale l\'ordine deve essere effettuato entro il [DATA].' ),

			array( 'h2', '8. Diritto di recesso' ),
			array( 'p', 'Trattandosi di beni confezionati su misura e chiaramente personalizzati, il diritto di recesso è escluso ai sensi dell\'art. 59, comma 1, lettera c) del Codice del Consumo (D.Lgs. 206/2005).' ),

			array( 'h2', '9. Garanzia legale e prodotti difettosi' ),
			array( 'p', 'Resta valida la garanzia legale di conformità prevista dagli artt. 128 e seguenti del Codice del Consumo. In caso di prodotto difettoso, danneggiato o non conforme all\'ordine, il cliente può scrivere a [EMAIL] allegando foto del prodotto: il venditore provvederà a ristampa, sostituzione o rimborso secondo quanto previsto dalla legge.' ),

			array( 'h2', '10. Legge applicabile e foro competente' ),
			array( 'p', 'Il contratto è regolato dalla legge italiana. Per le controversie con i consumatori è competente il giudice del luogo di residenza o domicilio del consumatore.' ),
		)
	);
}


function sublimami_privacy_template() {
	return sublimami_blocks(
		array(
			sublimami_draft_notice(),

			array( 'h2', 'Titolare del trattamento' ),
			array( 'p', '[RAGIONE SOCIALE], [INDIRIZZO COMPLETO], Partita IVA [PARTITA IVA], email [EMAIL].' ),

			array( 'h2', 'Quali dati trattiamo' ),
			array(
				'ul',
				array(
					'Dati dell\'ordine: nome, cognome, indirizzo, email, telefono (se indicato), prodotti acquistati.',
					'Foto e testi caricati nel configuratore, usati solo per realizzare i prodotti ordinati.',
					'Dati tecnici di navigazione necessari al funzionamento del sito e del carrello.',
				)
			),

			array( 'h2', 'Perché li trattiamo e su quale base' ),
			array(
				'ul',
				array(
					'Gestire l\'ordine, la produzione e la consegna: esecuzione del contratto (art. 6.1.b GDPR).',
					'Adempiere agli obblighi fiscali e contabili: obbligo di legge (art. 6.1.c GDPR).',
					'Rispondere alle richieste di assistenza: esecuzione del contratto o misure precontrattuali.',
				)
			),

			array( 'h2', 'A chi comunichiamo i dati' ),
			array( 'p', 'Solo ai fornitori necessari, nominati responsabili del trattamento: Stripe (pagamenti), [FORNITORE HOSTING] (hosting del sito), [CORRIERE] (consegna). Stripe può trattare dati anche fuori dall\'Unione Europea con le garanzie previste dal GDPR (clausole contrattuali standard o Data Privacy Framework).' ),

			array( 'h2', 'Per quanto tempo li conserviamo' ),
			array(
				'ul',
				array(
					'Dati degli ordini e documenti fiscali: 10 anni, come previsto dalla legge.',
					'Foto e file di stampa degli ordini: [NUMERO] mesi dalla consegna, per gestire eventuali contestazioni, poi vengono cancellati.',
					'Foto caricate senza completare l\'ordine: cancellate automaticamente dopo 14 giorni.',
				)
			),
			array( 'p', 'Il progetto in corso nel configuratore viene salvato solo nel browser del cliente e non viene inviato al negozio finché non si procede al pagamento.' ),

			array( 'h2', 'Cookie' ),
			array( 'p', 'Il sito usa solo cookie tecnici necessari al funzionamento del carrello e del pagamento (sessione WooCommerce e cookie antifrode di Stripe). Non usiamo cookie di profilazione né di statistica di terze parti; per questo non è richiesto il consenso. Se in futuro verranno aggiunti strumenti di statistica o marketing, questa informativa e il banner dei cookie saranno aggiornati.' ),

			array( 'h2', 'I tuoi diritti' ),
			array( 'p', 'Puoi chiedere in qualsiasi momento accesso, rettifica, cancellazione, limitazione, portabilità dei dati e opporti al trattamento (artt. 15-22 GDPR) scrivendo a [EMAIL]. Puoi anche presentare reclamo al Garante per la protezione dei dati personali (www.garanteprivacy.it).' ),
		)
	);
}
