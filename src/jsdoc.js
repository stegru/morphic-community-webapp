// Documentation for some types used throughout the site.

/* eslint-disable jsdoc/require-property-description */

/**
 * Item of a bar.
 *
 * @typedef {Object} BarItem
 * @property {String} kind The kind of item (url, application, action)
 * @property {Boolean} is_primary
 * @property {BarItemConfiguration_Url|BarItemConfiguration_Application} configuration
 **/

/**
 * General configuration options of a BarItem
 *
 * @typedef {Object} BarItemConfiguration
 * @property {String} label Button text
 * @property {String} category Category in the catalog
 * @property {String} color Button color (html string)
 * @property {String} image_url Link to the image (relative or absolute)
 * @property {String} description More info.
 * @property {ItemParameters} parameters Named parameters used in fields.
 * @property {Array<String>} paramFields The field names which are parameterised.
 */

/**
 * Options of a `kind = "url"` BarItem.
 *
 * @typedef {BarItemConfiguration} BarItemConfiguration_Url
 * @mixin
 * @property {String} url The address.
 **/

/**
 * Options of a `kind = "application"` BarItem.
 *
 * @typedef {BarItemConfiguration} BarItemConfiguration_Application
 * @mixin
 * @property {String} default
 * @property {String} description
 **/
