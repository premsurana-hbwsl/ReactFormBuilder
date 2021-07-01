<?php
/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link    https://wpadcenter.com/
 * @since   1.0.0
 * @package Wpadcenter
 *
 * @wordpress-plugin
 * Plugin Name:       ReactFormBuilder
 * Plugin URI:        https://google.com
 * Description:       Drag and drop form builder.
 * Version:           1.0.0
 * Author:            WPEka Club
 * Author URI:        https://club.wpeka.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       reactformbuilder
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}


function rfb_setup_app_page() {
	if ( empty( $_GET['page'] ) || 'rfb' !== $_GET['page'] ) { // phpcs:ignore CSRF ok, input var ok.
		return;
	}
	
	// Don't load the interface if doing an ajax call.
	if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {
		return;
	}

	set_current_screen();

	// Remove an action in the Gutenberg plugin ( not core Gutenberg ) which throws an error.
	remove_action( 'admin_print_styles', 'gutenberg_block_editor_admin_print_styles' );
	html();
}

function html() {
	wp_register_script(
		'rfb-main',
		plugin_dir_url( __FILE__ ) . 'dist/index.bundle.js',
		array( 'wp-i18n' ),
		time(),
		true
	);
	
	?>
		<!DOCTYPE html>
		<html <?php language_attributes(); ?>>
		<head>
			<meta name="viewport" content="width=device-width"/>
			<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
			<title><?php esc_html_e( 'WPLegalPages &rsaquo; Wizard', 'wplegalpages' ); ?></title>
		</head>
		<body class="wplegal-wizard">
			<div id="root"></div>
			<?php wp_print_scripts( 'rfb-main' ); ?>
		</body>
		</html>
	<?php

	exit;
}

add_action( 'admin_init', 'rfb_setup_app_page' );

/**
 * VFB one page app.
 */
function rfb_plugin_load_text_domain() {
	load_plugin_textdomain( 'reactformbuilder', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
}

add_action( 'plugins_loaded', 'rfb_plugin_load_text_domain' );


/**
 * Enqueue scripts.
 */
function rfb_admin_enqueue_scripts() {
}

add_action( 'admin_enqueue_scripts', 'rfb_admin_enqueue_scripts' );

/**
 * Register a custom menu page.
 */
function rfb_menu_page() {

	add_dashboard_page( '', '', 'manage_options', 'rfb', '' );

	add_menu_page(
		'React Form Builder',
		'rfb',
		'manage_options',
		'rfb-menu',
		'rfb_app'
	);

	add_submenu_page(
		'rfb-menu',
		esc_attr__( 'React form builder', 'reactformbuilder' ),
		esc_attr__( 'React form builder', 'reactformbuilder' ),
		'manage_options',
		'index.php?page=rfb'
	);
}

/**
 * VFB one page app.
 */
function rfb_app() {}

add_action( 'admin_menu', 'rfb_menu_page' );
