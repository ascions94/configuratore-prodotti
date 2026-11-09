<?php
/**
 * Pulizia giornaliera: elimina i file degli articoli mai ordinati
 * (carrelli abbandonati) più vecchi di SUBLIMAMI_KEEP_UNORDERED_DAYS giorni.
 * I file collegati a un ordine non vengono mai toccati.
 */

defined( 'ABSPATH' ) || exit;

if ( ! defined( 'SUBLIMAMI_KEEP_UNORDERED_DAYS' ) ) {
	define( 'SUBLIMAMI_KEEP_UNORDERED_DAYS', 14 );
}

function sublimami_schedule_cleanup() {
	if ( ! wp_next_scheduled( 'sublimami_cleanup' ) ) {
		wp_schedule_event( time() + HOUR_IN_SECONDS, 'daily', 'sublimami_cleanup' );
	}
}

add_action( 'sublimami_cleanup', 'sublimami_run_cleanup' );

function sublimami_run_cleanup() {
	global $wpdb;

	$dir = sublimami_items_dir();

	if ( ! is_dir( $dir['path'] ) ) {
		return;
	}

	$limit = time() - SUBLIMAMI_KEEP_UNORDERED_DAYS * DAY_IN_SECONDS;

	foreach ( (array) glob( $dir['path'] . '/*', GLOB_ONLYDIR ) as $item_dir ) {
		$token = basename( $item_dir );

		if ( ! sublimami_is_valid_token( $token ) || filemtime( $item_dir ) > $limit ) {
			continue;
		}

		$ordered = $wpdb->get_var( // phpcs:ignore WordPress.DB.DirectDatabaseQuery
			$wpdb->prepare(
				"SELECT COUNT(*) FROM {$wpdb->prefix}woocommerce_order_itemmeta WHERE meta_key = '_sublimami_token' AND meta_value = %s",
				$token
			)
		);

		if ( ! (int) $ordered ) {
			sublimami_delete_item_dir( $token );
		}
	}
}
