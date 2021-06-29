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
	wp_enqueue_script(
		'rfb-main',
		plugin_dir_url( __FILE__ ) . 'dist/index.bundle.js',
		array( 'wp-i18n' ),
		time(),
		true
	);
}

add_action( 'admin_enqueue_scripts', 'rfb_admin_enqueue_scripts' );

/**
 * Register a custom menu page.
 */
function rfb_menu_page() {
	add_menu_page(
		'React Form Builder',
		'rfb',
		'manage_options',
		'rfb-menu',
		'rfb_app'
	);
}

/**
 * VFB one page app.
 */
function rfb_app() {
	?>
		<div id="root"></div>
	<?php
	wp_enqueue_script( 'rfb-main' );
}

add_action( 'admin_menu', 'rfb_menu_page' );