<?php
/**
 * Plugin Name:       SubliMaMi Configuratore
 * Description:       Configuratore di prodotti personalizzati (cuscino, T-shirt, portachiavi) collegato al carrello WooCommerce, con file di stampa a 300 dpi allegati agli ordini.
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
 * Prodotti gestiti dal configuratore: la chiave è quella usata in script.js.
 * Nome e prezzo servono solo alla prima creazione del prodotto WooCommerce;
 * dopo si modificano dal pannello Prodotti.
 */
function sublimami_products() {
	return array(
		'cushion'  => array(
			'name'  => 'Cuscino personalizzato 40x40 cm',
			'price' => '19.90',
		),
		'tshirt'   => array(
			'name'  => 'T-shirt personalizzata',
			'price' => '19.90',
		),
		'keychain' => array(
			'name'  => 'Portachiavi personalizzato 4,5x4,5 cm',
			'price' => '14.90',
		),
	);
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
