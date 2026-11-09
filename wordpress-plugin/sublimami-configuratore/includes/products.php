<?php
/**
 * Prodotti WooCommerce collegati al configuratore e pagina "Personalizza".
 */

defined( 'ABSPATH' ) || exit;

/*
 * Al primo avvio con WooCommerce attivo creiamo i tre prodotti
 * (nascosti dal catalogo: si acquistano solo dal configuratore)
 * e la pagina con lo shortcode del configuratore.
 */
add_action( 'woocommerce_init', 'sublimami_maybe_setup' );

function sublimami_maybe_setup() {
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


function sublimami_all_products_exist() {
	foreach ( array_keys( sublimami_products() ) as $product_key ) {
		if ( ! sublimami_get_product( $product_key ) ) {
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
		if ( sublimami_get_product( $product_key ) ) {
			continue;
		}

		$product = new WC_Product_Simple();
		$product->set_name( $definition['name'] );
		$product->set_regular_price( $definition['price'] );
		$product->set_status( 'publish' );
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
 * Prezzi da mostrare nel configuratore (come nel negozio, IVA secondo le impostazioni).
 */
function sublimami_get_display_prices() {
	$prices = array();

	foreach ( array_keys( sublimami_products() ) as $product_key ) {
		$product = sublimami_get_product( $product_key );

		if ( $product ) {
			$prices[ $product_key ] = (float) wc_get_price_to_display( $product );
		}
	}

	return $prices;
}
