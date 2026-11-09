<?php
/**
 * Pagina del configuratore.
 *
 * Il configuratore ha un suo foglio di stile che modifica elementi globali
 * (body, header, ...): per non rompere il tema né la calibrazione mobile,
 * la pagina che contiene lo shortcode [sublimami_configuratore] viene servita
 * come pagina a sé, sullo stesso dominio del negozio (carrello condiviso).
 */

defined( 'ABSPATH' ) || exit;

/* Fuori dalla pagina dedicata (es. anteprime, estratti) lo shortcode non mostra nulla. */
add_shortcode(
	'sublimami_configuratore',
	function () {
		return '';
	}
);


add_action( 'template_redirect', 'sublimami_maybe_render_app', 1 );

function sublimami_maybe_render_app() {
	if ( ! is_singular() ) {
		return;
	}

	$post = get_queried_object();

	if ( ! $post instanceof WP_Post || ! has_shortcode( $post->post_content, 'sublimami_configuratore' ) ) {
		return;
	}

	if ( ! class_exists( 'WooCommerce' ) ) {
		return;
	}

	sublimami_render_app( $post );
	exit;
}


function sublimami_get_app_config( WP_Post $post ) {
	return array(
		'restUrl'        => esc_url_raw( rest_url( 'sublimami/v1/' ) ),
		/*
		 * Il nonce serve solo agli utenti connessi (es. amministratore che prova
		 * il negozio): per i visitatori WooCommerce usa il cookie di sessione.
		 */
		'nonce'          => is_user_logged_in() ? wp_create_nonce( 'wp_rest' ) : null,
		'checkoutUrl'    => esc_url_raw( wc_get_checkout_url() ),
		'cartUrl'        => esc_url_raw( wc_get_cart_url() ),
		'homeUrl'        => esc_url_raw( home_url( '/' ) ),
		'pageUrl'        => esc_url_raw( get_permalink( $post ) ),
		'privacyUrl'     => esc_url_raw( get_privacy_policy_url() ),
		'termsUrl'       => esc_url_raw( sublimami_get_published_page_url( wc_terms_and_conditions_page_id() ) ),
		'seller'         => sublimami_get_seller_line(),
		'prices'         => sublimami_get_display_prices(),
		'maxUploadBytes' => min( (int) wp_max_upload_size(), (int) SUBLIMAMI_MAX_FILE_BYTES ),
	);
}


function sublimami_render_app( WP_Post $post ) {
	$index_file = SUBLIMAMI_DIR . 'app/index.html';

	if ( ! is_readable( $index_file ) ) {
		wp_die( esc_html__( 'Il configuratore non è installato correttamente: manca app/index.html.', 'sublimami' ) );
	}

	$html     = file_get_contents( $index_file ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
	$app_url  = SUBLIMAMI_URL . 'app/';
	$page_url = get_permalink( $post );
	$config   = sublimami_get_app_config( $post );

	/*
	 * <base> fa puntare tutti i percorsi relativi (CSS, script, immagini
	 * caricate anche da JavaScript) alla cartella app del plugin.
	 */
	$head_extra  = '<base href="' . esc_url( $app_url ) . '">' . "\n";
	$head_extra .= '<meta name="robots" content="index, follow">' . "\n";
	$head_extra .= '<link rel="canonical" href="' . esc_url( $page_url ) . '">' . "\n";
	$head_extra .= '<script>window.SUBLIMAMI_CONFIG = ' . wp_json_encode( $config ) . ';</script>' . "\n";

	$html = preg_replace( '/<head>/i', "<head>\n" . $head_extra, $html, 1 );

	/* Con <base> i link "#" porterebbero alla cartella del plugin: restano sulla pagina. */
	$html = str_replace( 'href="#"', 'href="' . esc_url( $page_url ) . '#"', $html );

	$title = wp_strip_all_tags( get_the_title( $post ) . ' – ' . get_bloginfo( 'name' ) );
	$html  = preg_replace( '/<title>.*?<\/title>/is', '<title>' . esc_html( $title ) . '</title>', $html, 1 );

	nocache_headers();
	header( 'Content-Type: text/html; charset=utf-8' );

	echo $html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- HTML del configuratore, valori dinamici già sanificati sopra.
}
