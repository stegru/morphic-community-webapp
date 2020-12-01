// Documentation for some types used throughout the site.

/* eslint-disable jsdoc/require-property-description */

/**
 * Item of a bar.
 * @typedef {Object} BarItem
 * @property {String} kind The kind of item (url, application, action)
 * @property {Boolean} is_primary
 * @property {BarItemConfiguration_Url|BarItemConfiguration_Application} configuration
 **/

/**
 * General configuration options of a BarItem
 * @typedef {Object} BarItemConfiguration
 * @property {String} label
 * @property {String} category
 * @property {String} color
 * @property {String} image_url
 * @property {String} description
 */

/**
 * Options of a `kind = "url"` BarItem.
 * @typedef {BarItemConfiguration} BarItemConfiguration_Url
 * @mixin
 * @property {String} url
 **/

/**
 * Options of a `kind = "application"` BarItem.
 * @typedef {BarItemConfiguration} BarItemConfiguration_Application
 * @mixin
 * @property {String} default
 * @property {String} description
 **/
