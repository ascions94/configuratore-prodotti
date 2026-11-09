<?php
/**
 * Prodotti WooCommerce collegati al configuratore e pagina "Personalizza".
 */

defined( 'ABSPATH' ) || exit;

/*
 * Al primo avvio con WooCommerce attivo creiamo i prodotti
 * (nascosti dal catalogo: si acquistano solo dal configuratore)
 * e la pagina con lo shortcode del configuratore.
 *
 * Su "init" con priorità 20: WooCommerce ha già registrato i tipi di
 * contenuto. Su "woocommerce_init" wc_get_product() non funziona ancora
 * e i prodotti risultavano sempre mancanti (venivano ricreati a ogni pagina).
 */
add_action( 'init', 'sublimami_maybe_setup', 20 );

function sublimami_maybe_setup() {
	if ( ! class_exists( 'WooCommerce' ) ) {
		return;
	}

	if (
		! get_option( 'sublimami_needs_setup' ) &&
		sublimami_all_products_exist() &&
		get_option( 'sublimami_legal_pages' )
	) {
		return;
	}

	sublimami_create_missing_products();
	sublimami_maybe_create_page();
	sublimami_maybe_create_legal_drafts();
	sublimami_schedule_cleanup();

	delete_option( 'sublimami_needs_setup' );
}


function sublimami_get_product_ids() {
	$ids = get_option( 'sublimami_product_ids', array() );
	return is_array( $ids ) ? $ids : array();
}


function sublimami_get_product_id( $product_key ) {
	$ids = sublimami_get_product_ids();
	return isset( $ids[ $product_key ] ) ? (int) $ids[ $product_key ] : 0;
}


/*
 * Restituisce il prodotto WooCommerce acquistabile per una chiave del configuratore.
 */
function sublimami_get_product( $product_key ) {
	$product_id = sublimami_get_product_id( $product_key );

	if ( ! $product_id ) {
		return null;
	}

	$product = wc_get_product( $product_id );

	if ( ! $product || 'trash' === $product->get_status() ) {
		return null;
	}

	return $product;
}


/*
 * Il prodotto della chiave esiste (anche in bozza) e non è nel cestino.
 * Controlla solo il post: non dipende dal caricamento di WooCommerce.
 */
function sublimami_product_exists( $product_key ) {
	$product_id = sublimami_get_product_id( $product_key );

	if ( ! $product_id || 'product' !== get_post_type( $product_id ) ) {
		return false;
	}

	$status = get_post_status( $product_id );

	return $status && 'trash' !== $status;
}


function sublimami_all_products_exist() {
	foreach ( array_keys( sublimami_products() ) as $product_key ) {
		if ( ! sublimami_product_exists( $product_key ) ) {
			return false;
		}
	}
	return true;
}


function sublimami_create_missing_products() {
	if ( ! class_exists( 'WC_Product_Simple' ) ) {
		return;
	}

	$ids = sublimami_get_product_ids();

	foreach ( sublimami_products() as $product_key => $definition ) {
		if ( sublimami_product_exists( $product_key ) ) {
			continue;
		}

		$product = new WC_Product_Simple();
		$product->set_name( $definition['name'] );

		/* Prezzo da definire: bozza senza prezzo, non acquistabile finché non si pubblica. */
		if ( null === $definition['price'] ) {
			$product->set_status( 'draft' );
		} else {
			$product->set_regular_price( $definition['price'] );
			$product->set_status( 'publish' );
		}

		$product->set_catalog_visibility( 'hidden' );
		$product->set_tax_status( 'taxable' );
		$product->set_manage_stock( false );
		$product->set_sold_individually( false );
		$product->update_meta_data( '_sublimami_product', $product_key );

		$ids[ $product_key ] = $product->save();
	}

	update_option( 'sublimami_product_ids', $ids );
}


function sublimami_get_page_id() {
	$page_id = (int) get_option( 'sublimami_page_id', 0 );

	if ( $page_id && 'trash' !== get_post_status( $page_id ) && get_post( $page_id ) ) {
		return $page_id;
	}

	return 0;
}


function sublimami_maybe_create_page() {
	if ( sublimami_get_page_id() ) {
		return;
	}

	$page_id = wp_insert_post(
		array(
			'post_type'    => 'page',
			'post_status'  => 'publish',
			'post_title'   => 'Personalizza',
			'post_name'    => 'personalizza',
			'post_content' => '<!-- wp:shortcode -->[sublimami_configuratore]<!-- /wp:shortcode -->',
		)
	);

	if ( $page_id && ! is_wp_error( $page_id ) ) {
		update_option( 'sublimami_page_id', (int) $page_id );
	}
}


/*
 * Prodotto in vendita: pubblicato e con un prezzo. Non usiamo
 * is_purchasable() perché per gli amministratori vale anche per le bozze.
 */
function sublimami_is_on_sale( $product ) {
	return $product &&
		'publish' === $product->get_status() &&
		'' !== $product->get_price();
}


/*
 * Prezzi da mostrare nel configuratore (come nel negozio, IVA secondo le
 * impostazioni). I prodotti non in vendita mancano: nel configuratore
 * restano "Prezzo da definire".
 * - prices: chiave del configuratore -> prezzo
 * - tshirtPrices: tessuto -> modello -> prezzo
 */
function sublimami_get_display_prices() {
	$prices        = array();
	$tshirt_prices = array();
	$options       = sublimami_tshirt_options();

	foreach ( array_keys( sublimami_products() ) as $product_key ) {
		$product = sublimami_get_product( $product_key );

		if ( ! sublimami_is_on_sale( $product ) ) {
			continue;
		}

		$prices[ $product_key ] = (float) wc_get_price_to_display( $product );
	}

	foreach ( array_keys( $options['fabrics'] ) as $fabric ) {
		foreach ( array_keys( $options['fits'] ) as $fit ) {
			$key = sublimami_tshirt_product_key( $fabric, $fit );

			if ( isset( $prices[ $key ] ) ) {
				$tshirt_prices[ $fabric ][ $fit ] = $prices[ $key ];
				unset( $prices[ $key ] );
			}
		}
	}

	return array(
		'prices'       => $prices,
		'tshirtPrices' => $tshirt_prices,
	);
}
