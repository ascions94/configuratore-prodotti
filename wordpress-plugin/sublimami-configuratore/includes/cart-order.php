<?php
/**
 * Dettagli della personalizzazione in carrello, checkout, ordini ed email.
 */

defined( 'ABSPATH' ) || exit;

function sublimami_color_label( $color ) {
	$labels = array(
		'white' => 'Bianca',
		'black' => 'Nera',
	);
	return isset( $labels[ $color ] ) ? $labels[ $color ] : $color;
}


function sublimami_side_label( $side ) {
	return 'back' === $side ? 'Retro' : 'Fronte';
}


function sublimami_format_label( $format ) {
	return 'horizontal' === $format ? 'orizzontale 30x20 cm' : 'verticale 20x30 cm';
}


/*
 * Righe leggibili dal cliente e dal negozio: etichetta => valore.
 */
function sublimami_describe( array $data ) {
	$rows = array();

	if ( 'tshirt' === $data['product'] ) {
		$rows['Colore'] = sublimami_color_label( $data['color'] );
		$rows['Taglia'] = $data['size'];

		$printed = array();

		foreach ( array( 'front', 'back' ) as $side ) {
			if ( ! empty( $data['print'][ $side ] ) ) {
				$format    = isset( $data['formats'][ $side ] ) ? $data['formats'][ $side ] : 'vertical';
				$printed[] = sublimami_side_label( $side ) . ' (' . sublimami_format_label( $format ) . ')';
			}
		}

		$rows['Stampa'] = implode( ', ', $printed );
	} else {
		$rows['Stampa'] = 'Personalizzata';
	}

	return $rows;
}


/*
 * CARRELLO E CHECKOUT (classici e a blocchi)
 */
add_filter(
	'woocommerce_get_item_data',
	function ( $item_data, $cart_item ) {
		if ( empty( $cart_item['sublimami'] ) ) {
			return $item_data;
		}

		foreach ( sublimami_describe( $cart_item['sublimami'] ) as $label => $value ) {
			$item_data[] = array(
				'key'   => $label,
				'value' => $value,
			);
		}

		return $item_data;
	},
	10,
	2
);


/* Anteprima della personalizzazione al posto della foto del prodotto (carrello classico). */
add_filter(
	'woocommerce_cart_item_thumbnail',
	function ( $thumbnail, $cart_item ) {
		if ( empty( $cart_item['sublimami'] ) ) {
			return $thumbnail;
		}

		$url = sublimami_preview_url( $cart_item['sublimami'] );

		if ( ! $url ) {
			return $thumbnail;
		}

		return '<img src="' . esc_url( $url ) . '" alt="' . esc_attr__( 'Anteprima personalizzazione', 'sublimami' ) . '" width="96" height="96" style="object-fit:contain;background:#f6f6f6">';
	},
	10,
	2
);


/* Anteprima anche nel carrello e nel checkout a blocchi. */
add_filter(
	'woocommerce_store_api_cart_item_images',
	function ( $images, $cart_item ) {
		if ( empty( $cart_item['sublimami'] ) ) {
			return $images;
		}

		$url = sublimami_preview_url( $cart_item['sublimami'] );

		if ( ! $url ) {
			return $images;
		}

		return array(
			(object) array(
				'id'        => 0,
				'src'       => $url,
				'thumbnail' => $url,
				'srcset'    => '',
				'sizes'     => '',
				'name'      => 'Anteprima personalizzazione',
				'alt'       => 'Anteprima personalizzazione',
			),
		);
	},
	10,
	2
);


function sublimami_preview_url( array $data ) {
	foreach ( array( 'front', 'back' ) as $side ) {
		if ( ! empty( $data['preview'][ $side ] ) ) {
			return sublimami_item_url( $data['token'], $data['preview'][ $side ] );
		}
	}
	return '';
}


/*
 * ORDINE: salviamo i dettagli nella riga dell'ordine.
 */
add_action(
	'woocommerce_checkout_create_order_line_item',
	function ( $item, $cart_item_key, $values ) {
		if ( empty( $values['sublimami'] ) ) {
			return;
		}

		$data = $values['sublimami'];

		foreach ( sublimami_describe( $data ) as $label => $value ) {
			$item->add_meta_data( $label, $value, true );
		}

		/* Meta nascosti (iniziano con _): dati completi e collegamento ai file. */
		$item->add_meta_data( '_sublimami', $data, true );
		$item->add_meta_data( '_sublimami_token', $data['token'], true );
	},
	10,
	3
);


/*
 * Pannello ordine (amministrazione): anteprime e file di stampa da scaricare.
 */
add_action(
	'woocommerce_after_order_itemmeta',
	function ( $item_id, $item ) {
		if ( ! is_admin() || ! $item instanceof WC_Order_Item_Product ) {
			return;
		}

		$data = $item->get_meta( '_sublimami' );

		if ( empty( $data ) || ! is_array( $data ) ) {
			return;
		}

		echo '<div class="sublimami-order-files" style="margin-top:8px;display:flex;gap:16px;flex-wrap:wrap">';

		foreach ( array( 'front', 'back' ) as $side ) {
			if ( empty( $data['print'][ $side ] ) ) {
				continue;
			}

			$print       = $data['print'][ $side ];
			$print_url   = sublimami_item_url( $data['token'], $print['file'] );
			$preview_url = ! empty( $data['preview'][ $side ] ) ? sublimami_item_url( $data['token'], $data['preview'][ $side ] ) : '';
			$size_text   = $print['width'] . '×' . $print['height'] . ' px, 300 dpi';

			echo '<div style="border:1px solid #dcdcde;border-radius:6px;padding:8px;max-width:220px">';
			echo '<strong>' . esc_html( sublimami_side_label( $side ) ) . '</strong><br>';

			if ( $preview_url ) {
				echo '<a href="' . esc_url( $preview_url ) . '" target="_blank" rel="noopener"><img src="' . esc_url( $preview_url ) . '" alt="" style="width:200px;height:auto;margin:6px 0;background:#f6f6f6"></a><br>';
			}

			echo '<a class="button button-small" href="' . esc_url( $print_url ) . '" download>' . esc_html__( 'Scarica file di stampa', 'sublimami' ) . '</a>';
			echo '<div style="color:#646970;font-size:12px;margin-top:4px">' . esc_html( $size_text ) . '</div>';
			echo '</div>';
		}

		echo '</div>';
	},
	10,
	2
);


/*
 * Dopo l'ordine svuotiamo il carrello salvato nel configuratore
 * (IndexedDB e vecchio localStorage), sullo stesso dominio.
 */
add_action(
	'wp_footer',
	function () {
		if ( ! function_exists( 'is_wc_endpoint_url' ) || ! is_wc_endpoint_url( 'order-received' ) ) {
			return;
		}
		?>
<script>
(function () {
	try { localStorage.removeItem("mycustomCart"); } catch (e) {}
	try {
		var request = indexedDB.open("sublimami-configuratore", 1);
		request.onupgradeneeded = function () { request.result.createObjectStore("kv"); };
		request.onsuccess = function () {
			var db = request.result;
			var transaction = db.transaction("kv", "readwrite");
			transaction.objectStore("kv").delete("mycustomCart");
			transaction.oncomplete = function () { db.close(); };
		};
	} catch (e) {}
})();
</script>
		<?php
	}
);
