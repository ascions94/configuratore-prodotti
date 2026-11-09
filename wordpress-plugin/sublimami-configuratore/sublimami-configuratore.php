<?php
/**
 * Plugin Name:       SubliMaMi Configuratore
 * Description:       Configuratore di prodotti personalizzati (cuscini, T-shirt, portachiavi, tele, mattonelle, tappetini) collegato al carrello WooCommerce, con file di stampa a 300 dpi allegati agli ordini.
 * Version:           1.0.0
 * Author:            SubliMaMi
 * Requires at least: 6.3
 * Requires PHP:      7.4
 * Requires Plugins:  woocommerce
 * Text Domain:       sublimami
 */

defined( 'ABSPATH' ) || exit;

define( 'SUBLIMAMI_VERSION', '1.0.0' );
define( 'SUBLIMAMI_FILE', __FILE__ );
define( 'SUBLIMAMI_DIR', plugin_dir_path( __FILE__ ) );
define( 'SUBLIMAMI_URL', plugin_dir_url( __FILE__ ) );

/*
 * Dimensione massima di ogni file caricato (file di stampa o anteprima).
 * Un file di stampa 30x30 cm a 300 dpi con foto pesa di solito 2-20 MB.
 */
if ( ! defined( 'SUBLIMAMI_MAX_FILE_BYTES' ) ) {
	define( 'SUBLIMAMI_MAX_FILE_BYTES', 40 * 1024 * 1024 );
}

/*
 * Prodotti WooCommerce collegati al configuratore.
 *
 * La chiave è quella usata in script.js; la T-shirt ha un prodotto per
 * ogni tessuto e modello ("tshirt-cotton-adult"...), così ognuno ha il
 * suo prezzo. Nome e prezzo servono solo alla prima creazione: dopo si
 * modificano dal pannello Prodotti di WooCommerce.
 *
 * price null = prezzo da definire: il prodotto viene creato in bozza e
 * senza prezzo (nel configuratore compare "Prezzo da definire"). Per
 * venderlo basta dargli un prezzo e pubblicarlo.
 */
function sublimami_products() {
	$products = array(
		'cushion'         => array( 'name' => 'Cuscino grande 40x40 cm personalizzato', 'price' => '15.00' ),
		'cushion-small'   => array( 'name' => 'Cuscino quadrato piccolo personalizzato', 'price' => '10.00' ),
		'heart-small'     => array( 'name' => 'Cuscino a cuore piccolo personalizzato', 'price' => '10.00' ),
		'heart-large'     => array( 'name' => 'Cuscino a cuore grande personalizzato', 'price' => '15.00' ),
		'canvas-s'        => array( 'name' => 'Tela 18x24 cm personalizzata', 'price' => null ),
		'canvas-m'        => array( 'name' => 'Tela 20x30 cm personalizzata', 'price' => null ),
		'canvas-l'        => array( 'name' => 'Tela 30x40 cm personalizzata', 'price' => null ),
		'tile-square'     => array( 'name' => 'Mattonella 20x20 cm personalizzata', 'price' => null ),
		'tile-rect'       => array( 'name' => 'Mattonella 15x20 cm personalizzata', 'price' => null ),
		'mousepad'        => array( 'name' => 'Tappetino mouse 22x18 cm personalizzato', 'price' => '10.00' ),
		'keychain-round'  => array( 'name' => 'Portachiavi tondo personalizzato', 'price' => '10.00' ),
		'keychain-square' => array( 'name' => 'Portachiavi quadrato personalizzato', 'price' => '10.00' ),
		'keychain-rect'   => array( 'name' => 'Portachiavi rettangolare personalizzato', 'price' => '10.00' ),
		'keychain-heart'  => array( 'name' => 'Portachiavi cuore personalizzato', 'price' => '10.00' ),
	);

	foreach ( sublimami_tshirt_options()['fabrics'] as $fabric => $fabric_data ) {
		foreach ( sublimami_tshirt_options()['fits'] as $fit => $fit_label ) {
			$products[ sublimami_tshirt_product_key( $fabric, $fit ) ] = array(
				'name'  => 'T-shirt ' . $fabric_data['label'] . ' ' . strtolower( $fit_label ) . ' personalizzata',
				'price' => '15.00',
			);
		}
	}

	return $products;
}


/*
 * Opzioni della T-shirt, come in script.js (TSHIRT_FABRICS, TSHIRT_FITS,
 * TSHIRT_SIZES): servono a controllare i dati che arrivano dal configuratore.
 */
function sublimami_tshirt_options() {
	return array(
		'fabrics' => array(
			'cotton'    => array(
				'label'  => '100% cotone',
				'colors' => array( 'white', 'black' ),
			),
			'polyester' => array(
				'label'  => 'Poliestere',
				'colors' => array( 'white' ),
			),
		),
		'fits'    => array(
			'adult' => 'Adulto unisex',
			'kids'  => 'Bambino',
		),
		'sizes'   => array(
			'adult' => array(
				'cotton'    => array( 'S', 'M', 'L', 'XL', 'XXL' ),
				'polyester' => array( 'S', 'M', 'L', 'XL', 'XXL' ),
			),
			'kids'  => array(
				'cotton'    => array( '3-4 anni', '5-6 anni', '7-8 anni', '9-11 anni', '12-13 anni' ),
				'polyester' => array( '4-5 anni', '6-8 anni', '10-12 anni' ),
			),
		),
	);
}


function sublimami_tshirt_product_key( $fabric, $fit ) {
	return 'tshirt-' . $fabric . '-' . $fit;
}


/*
 * Prodotti orientabili (verticale / orizzontale), come "orientable" in script.js.
 */
function sublimami_orientable_products() {
	return array( 'canvas-s', 'canvas-m', 'canvas-l', 'tile-rect', 'keychain-rect' );
}

require_once SUBLIMAMI_DIR . 'includes/products.php';
require_once SUBLIMAMI_DIR . 'includes/legal.php';
require_once SUBLIMAMI_DIR . 'includes/app-page.php';
require_once SUBLIMAMI_DIR . 'includes/uploads.php';
require_once SUBLIMAMI_DIR . 'includes/rest-api.php';
require_once SUBLIMAMI_DIR . 'includes/cart-order.php';
require_once SUBLIMAMI_DIR . 'includes/cleanup.php';


register_activation_hook( __FILE__, 'sublimami_activate' );
register_deactivation_hook( __FILE__, 'sublimami_deactivate' );

function sublimami_activate() {
	/* Prodotti e pagina vengono creati al primo caricamento con WooCommerce attivo. */
	update_option( 'sublimami_needs_setup', 1 );
	sublimami_schedule_cleanup();
}

function sublimami_deactivate() {
	wp_clear_scheduled_hook( 'sublimami_cleanup' );
}


/*
 * Avviso se WooCommerce non è attivo (WordPress < 6.5 non legge "Requires Plugins").
 */
add_action(
	'admin_notices',
	function () {
		if ( class_exists( 'WooCommerce' ) ) {
			return;
		}
		echo '<div class="notice notice-error"><p>';
		echo esc_html__( 'SubliMaMi Configuratore richiede WooCommerce attivo.', 'sublimami' );
		echo '</p></div>';
	}
);
