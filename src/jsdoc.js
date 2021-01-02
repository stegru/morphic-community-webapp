// Documentation for some types used throughout the site.

/* eslint-disable jsdoc/require-property-description */

/**
 * A bar
 * @typedef {Object} BarDetails
 * @property {String} id Bar ID.
 * @property {String} name Display name.
 * @property {Boolean} is_shared Whether the bar is shown in the list of preconfigured bars that can be shared across
 *   multiple users.
 * @property {Array<BarItem>} items The bar items
 */

/**
 * Item of a bar.
 *
 * @typedef {Object} BarItem
 * @property {String} id Unique identifier.
 * @property {String} buttonKey Key in the buttons object, where this item was taken from.
 * @property {String} kind The kind of item (url, application, action).
 * @property {String} subkind The item category (email, news).
 * @property {Boolean} is_primary
 * @property {BarItemConfiguration} configuration
 **/

/**
 * Configuration options of a BarItem
 * @typedef {BarItemConfiguration_Url|BarItemConfiguration_Application} BarItemConfiguration
 */

/**
 * General configuration options of a BarItem
 *
 * @typedef {Object} BarItemConfigurationBase
 * @property {String} label Button text
 * @property {Boolean} catalogItem true if this instance is in the catalog (not added to the bar)
 * @property {String} catalogLabel Label in the catalog (if different to `label`).
 * @property {String} category Category in the catalog
 * @property {String} color Button color (html string)
 * @property {String} image_url Link to the image (relative or absolute)
 * @property {String} description More info.
 * @property {Boolean} [hasError] true if one of the parameter values has a validation error.
 * @property {ItemParameters} parameters Values of the named parameters used in fields.
 * @property {Array<String>} paramFields The field names of this object which are parameterised.
 */

/**
 * Options of a `kind = "url"` BarItem.
 *
 * @typedef {BarItemConfigurationBase} BarItemConfiguration_Url
 * @property {String} url The address.
 **/

/**
 * Options of a `kind = "application"` BarItem.
 *
 * @typedef {BarItemConfigurationBase} BarItemConfiguration_Application
 * @property {String} default
 * @property {String} description
 **/
