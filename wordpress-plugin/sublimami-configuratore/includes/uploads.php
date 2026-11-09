<?php
/**
 * Archivio dei file caricati dal configuratore (file di stampa e anteprime).
 *
 * Ogni articolo ha una cartella con nome casuale e non indovinabile:
 * wp-content/uploads/sublimami/items/<token>/
 */

defined( 'ABSPATH' ) || exit;

function sublimami_items_dir() {
	$uploads = wp_upload_dir( null, false );

	return array(
		'path' => trailingslashit( $uploads['basedir'] ) . 'sublimami/items',
		'url'  => trailingslashit( $uploads['baseurl'] ) . 'sublimami/items',
	);
}


/*
 * Crea la cartella base e la protegge: niente elenco dei file
 * e nessuna esecuzione di script.
 */
function sublimami_prepare_items_dir() {
	$dir  = sublimami_items_dir();
	$base = dirname( $dir['path'] );

	if ( ! wp_mkdir_p( $dir['path'] ) ) {
		return new WP_Error( 'sublimami_upload_dir', 'Impossibile creare la cartella dei file.' );
	}

	foreach ( array( $base, $dir['path'] ) as $folder ) {
		if ( ! file_exists( $folder . '/index.php' ) ) {
			file_put_contents( $folder . '/index.php', "<?php\n// Silence is golden.\n" ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_file_put_contents
		}
	}

	if ( ! file_exists( $base . '/.htaccess' ) ) {
		$rules  = "Options -Indexes\n";
		$rules .= "<FilesMatch \"\\.(php|phtml|php[0-9]|phar|pl|py|cgi|sh)$\">\n";
		$rules .= "  Require all denied\n";
		$rules .= "</FilesMatch>\n";
		file_put_contents( $base . '/.htaccess', $rules ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_file_put_contents
	}

	return $dir;
}


function sublimami_new_token() {
	return strtolower( wp_generate_password( 32, false, false ) );
}


function sublimami_is_valid_token( $token ) {
	return is_string( $token ) && (bool) preg_match( '/^[a-z0-9]{32}$/', $token );
}


function sublimami_item_url( $token, $file_name ) {
	$dir = sublimami_items_dir();
	return $dir['url'] . '/' . rawurlencode( $token ) . '/' . rawurlencode( $file_name );
}


/*
 * Controlla e salva un file caricato. Accetta solo immagini reali
 * dei tipi indicati, entro la dimensione massima.
 */
function sublimami_store_uploaded_image( $file, $destination, $allowed_mimes ) {
	if ( empty( $file['tmp_name'] ) || ! isset( $file['error'] ) || UPLOAD_ERR_OK !== (int) $file['error'] ) {
		return new WP_Error( 'sublimami_upload', 'Caricamento del file non riuscito. Il file potrebbe essere troppo grande per il server.' );
	}

	if ( (int) $file['size'] > SUBLIMAMI_MAX_FILE_BYTES ) {
		return new WP_Error( 'sublimami_upload_size', 'Il file è troppo grande.' );
	}

	$info = @getimagesize( $file['tmp_name'] ); // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged

	if ( ! $info || empty( $info['mime'] ) || ! in_array( $info['mime'], $allowed_mimes, true ) ) {
		return new WP_Error( 'sublimami_upload_type', 'Tipo di file non valido.' );
	}

	if ( ! @move_uploaded_file( $file['tmp_name'], $destination ) ) { // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged
		return new WP_Error( 'sublimami_upload_move', 'Impossibile salvare il file.' );
	}

	@chmod( $destination, 0644 ); // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged

	return array(
		'width'  => (int) $info[0],
		'height' => (int) $info[1],
		'bytes'  => (int) filesize( $destination ),
	);
}


function sublimami_delete_item_dir( $token ) {
	if ( ! sublimami_is_valid_token( $token ) ) {
		return;
	}

	$dir  = sublimami_items_dir();
	$path = $dir['path'] . '/' . $token;

	if ( ! is_dir( $path ) ) {
		return;
	}

	foreach ( (array) glob( $path . '/*' ) as $file ) {
		if ( is_file( $file ) ) {
			wp_delete_file( $file );
		}
	}

	@rmdir( $path ); // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged
}
