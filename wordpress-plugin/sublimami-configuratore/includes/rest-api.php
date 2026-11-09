<?php
/**
 * API usate dal configuratore al momento del checkout.
 *
 * POST /wp-json/sublimami/v1/cart/reset
 *      Toglie dal carrello WooCommerce gli articoli del configuratore
 *      (così ripetere il checkout non li duplica).
 *
 * POST /wp-json/sublimami/v1/cart/items   (multipart/form-data)
 *      item:          JSON { product, quantity, tshirtColor, tshirtSize, printFormat }
 *      print_front:   PNG del file di stampa (fronte)
 *      print_back:    PNG del file di stampa (retro, solo T-shirt)
 *      preview_front: JPEG/PNG anteprima (fronte)
 *      preview_back:  JPEG/PNG anteprima (retro, solo T-shirt)
 *
 * Il prezzo è sempre quello del prodotto WooCommerce, mai quello inviato dal browser.
 */

defined( 'ABSPATH' ) || exit;

/* Massimo di articoli caricati per indirizzo IP in un'ora (protezione da abusi). */
if ( ! defined( 'SUBLIMAMI_MAX_ITEMS_PER_HOUR' ) ) {
	define( 'SUBLIMAMI_MAX_ITEMS_PER_HOUR', 60 );
}

add_action( 'rest_api_init', 'sublimami_register_routes' );

function sublimami_register_routes() {
	register_rest_route(
		'sublimami/v1',
		'/cart/reset',
		array(
			'methods'             => 'POST',
			'callback'            => 'sublimami_rest_reset_cart',
			'permission_callback' => '__return_true',
		)
	);

	register_rest_route(
		'sublimami/v1',
		'/cart/items',
		array(
			'methods'             => 'POST',
			'callback'            => 'sublimami_rest_add_item',
			'permission_callback' => '__return_true',
		)
	);
}


/*
 * WooCommerce non carica sessione e carrello nelle richieste REST:
 * li carichiamo noi, con il cookie di sessione del visitatore.
 */
function sublimami_load_cart() {
	if ( ! function_exists( 'WC' ) ) {
		return new WP_Error( 'sublimami_no_wc', 'WooCommerce non è attivo.', array( 'status' => 500 ) );
	}

	if ( null === WC()->cart || null === WC()->session ) {
		wc_load_cart();
	}

	if ( WC()->session && ! WC()->session->has_session() ) {
		WC()->session->set_customer_session_cookie( true );
	}

	return true;
}


function sublimami_rest_reset_cart() {
	$loaded = sublimami_load_cart();

	if ( is_wp_error( $loaded ) ) {
		return $loaded;
	}

	foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) {
		if ( ! empty( $cart_item['sublimami'] ) ) {
			WC()->cart->remove_cart_item( $cart_item_key );
		}
	}

	WC()->cart->calculate_totals();

	return rest_ensure_response(
		array(
			'ok'        => true,
			'cartCount' => WC()->cart->get_cart_contents_count(),
		)
	);
}


function sublimami_rate_limit_exceeded() {
	$ip = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : 'unknown';
	$key   = 'sublimami_rl_' . md5( $ip );
	$count = (int) get_transient( $key );

	if ( $count >= SUBLIMAMI_MAX_ITEMS_PER_HOUR ) {
		return true;
	}

	set_transient( $key, $count + 1, HOUR_IN_SECONDS );
	return false;
}


/*
 * Legge e valida i dati dell'articolo inviati dal configuratore.
 */
function sublimami_parse_item( $raw ) {
	$data = json_decode( (string) $raw, true );

	if ( ! is_array( $data ) ) {
		return new WP_Error( 'sublimami_bad_item', 'Dati dell\'articolo non validi.', array( 'status' => 400 ) );
	}

	$product_key = isset( $data['product'] ) ? (string) $data['product'] : '';

	if ( ! array_key_exists( $product_key, sublimami_products() ) ) {
		return new WP_Error( 'sublimami_bad_product', 'Prodotto non valido.', array( 'status' => 400 ) );
	}

	$item = array(
		'product'  => $product_key,
		'quantity' => max( 1, min( 99, (int) ( isset( $data['quantity'] ) ? $data['quantity'] : 1 ) ) ),
		'sides'    => array( 'front' ),
	);

	if ( 'tshirt' === $product_key ) {
		$color   = isset( $data['tshirtColor'] ) ? (string) $data['tshirtColor'] : '';
		$size    = isset( $data['tshirtSize'] ) ? (string) $data['tshirtSize'] : '';
		$formats = isset( $data['printFormat'] ) && is_array( $data['printFormat'] ) ? $data['printFormat'] : array();

		if ( ! in_array( $color, array( 'white', 'black' ), true ) ) {
			return new WP_Error( 'sublimami_bad_color', 'Colore della T-shirt non valido.', array( 'status' => 400 ) );
		}

		if ( ! in_array( $size, array( 'S', 'M', 'L', 'XL', 'XXL' ), true ) ) {
			return new WP_Error( 'sublimami_bad_size', 'Taglia della T-shirt non valida.', array( 'status' => 400 ) );
		}

		$item['color']   = $color;
		$item['size']    = $size;
		$item['formats'] = array();
		$item['sides']   = array( 'front', 'back' );

		foreach ( $item['sides'] as $side ) {
			$format = isset( $formats[ $side ] ) ? (string) $formats[ $side ] : 'vertical';
			$item['formats'][ $side ] = in_array( $format, array( 'vertical', 'horizontal' ), true ) ? $format : 'vertical';
		}
	}

	return $item;
}


function sublimami_rest_add_item( WP_REST_Request $request ) {
	$loaded = sublimami_load_cart();

	if ( is_wp_error( $loaded ) ) {
		return $loaded;
	}

	if ( sublimami_rate_limit_exceeded() ) {
		return new WP_Error( 'sublimami_rate_limit', 'Troppe richieste. Riprova tra qualche minuto.', array( 'status' => 429 ) );
	}

	$item = sublimami_parse_item( $request->get_param( 'item' ) );

	if ( is_wp_error( $item ) ) {
		return $item;
	}

	$product = sublimami_get_product( $item['product'] );

	if ( ! $product || ! $product->is_purchasable() ) {
		return new WP_Error( 'sublimami_not_purchasable', 'Questo prodotto al momento non è acquistabile.', array( 'status' => 409 ) );
	}

	$dir = sublimami_prepare_items_dir();

	if ( is_wp_error( $dir ) ) {
		return $dir;
	}

	$token     = sublimami_new_token();
	$item_path = $dir['path'] . '/' . $token;

	if ( ! wp_mkdir_p( $item_path ) ) {
		return new WP_Error( 'sublimami_upload_dir', 'Impossibile creare la cartella dei file.', array( 'status' => 500 ) );
	}

	$files  = $request->get_file_params();
	$print  = array();
	$review = array();

	foreach ( $item['sides'] as $side ) {
		if ( ! empty( $files[ 'print_' . $side ] ) ) {
			$file_name = 'stampa-' . $side . '.png';
			$stored    = sublimami_store_uploaded_image( $files[ 'print_' . $side ], $item_path . '/' . $file_name, array( 'image/png' ) );

			if ( is_wp_error( $stored ) ) {
				sublimami_delete_item_dir( $token );
				$stored->add_data( array( 'status' => 400 ) );
				return $stored;
			}

			$print[ $side ] = array_merge( array( 'file' => $file_name ), $stored );
		}

		if ( ! empty( $files[ 'preview_' . $side ] ) ) {
			$file_name = 'anteprima-' . $side . '.jpg';
			$stored    = sublimami_store_uploaded_image( $files[ 'preview_' . $side ], $item_path . '/' . $file_name, array( 'image/jpeg', 'image/png' ) );

			if ( ! is_wp_error( $stored ) ) {
				$review[ $side ] = $file_name;
			}
		}
	}

	if ( empty( $print ) ) {
		sublimami_delete_item_dir( $token );
		return new WP_Error( 'sublimami_empty', 'Un articolo nel carrello non ha nessuna foto o scritta da stampare.', array( 'status' => 400 ) );
	}

	$cart_item_data = array(
		'sublimami' => array(
			'token'   => $token,
			'product' => $item['product'],
			'color'   => isset( $item['color'] ) ? $item['color'] : null,
			'size'    => isset( $item['size'] ) ? $item['size'] : null,
			'formats' => isset( $item['formats'] ) ? $item['formats'] : null,
			'print'   => $print,
			'preview' => $review,
		),
	);

	wc_clear_notices();

	$cart_item_key = WC()->cart->add_to_cart( $product->get_id(), $item['quantity'], 0, array(), $cart_item_data );

	if ( ! $cart_item_key ) {
		sublimami_delete_item_dir( $token );

		$notices = wc_get_notices( 'error' );
		$message = ! empty( $notices[0]['notice'] ) ? wp_strip_all_tags( $notices[0]['notice'] ) : 'Impossibile aggiungere l\'articolo al carrello.';
		wc_clear_notices();

		return new WP_Error( 'sublimami_add_to_cart', $message, array( 'status' => 409 ) );
	}

	return rest_ensure_response(
		array(
			'ok'        => true,
			'cartKey'   => $cart_item_key,
			'cartCount' => WC()->cart->get_cart_contents_count(),
		)
	);
}
