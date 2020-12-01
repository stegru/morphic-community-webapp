/**
 * @typedef {Object<String, ItemParameter>} ItemParameters
 *
 */
/**
 * @typedef {Object} ItemParameter
 * @property {String} paramKey paramKey.
 * @property {Any} value The value.
 */

/**
 * Prepares the parameter information on a button, during initial load.
 * @param {BarItem} button The button.
 */
export function prepareBarItem(button) {
    const params = button.configuration.parameters;
    delete button.configuration.parameters;

    if (params && params.length > 0) {
        const paramFields = [];

        // Create an original copy of the fields which contain parameter expanders
        Object.keys(button.configuration).forEach(key => {
            const value = button.configuration[key];
            if (containsParameter(value)) {
                button.configuration[`$${key}`] = value;
            }
            paramFields.push(key);
        });

        // Replace the initial parameters array with an associative array, to handle more information
        /** @type {ItemParameters} */
        const newParams = {};
        params.forEach(key => {
            newParams[key] = {
                paramKey: key,
                value: undefined
            };
        });

        button.configuration.paramFields = paramFields;
        button.configuration.parameters = newParams;
    }
}

/**
 * Apply the parameter values to the button fields.
 * @param {BarItem} button The button.
 * @param {Object} [newValues] New values to add.
 */
export function applyParameters(button, newValues) {
    const params = button.configuration.parameters;
    if (params) {
        if (newValues) {
            /** @param {ItemParameter} param */
            Object.values(params).forEach(param => {
                if (newValues[param] !== undefined) {
                    param.value = newValues[param];
                }
            });
        }

        button.configuration.paramFields.forEach(key => {
            button.configuration[key] = replaceParameters(params, button.configuration[`$${key}`]);
        });
    }
}

/**
 * Replaces the parameter expanders with the appropriate value.
 * @param {ItemParameters} params The parameter data.
 * @param {String} input The string to work on.
 * @return {String} The input string, with the parameter expanders replaced with their value.
 */
function replaceParameters(params, input) {
    // Matches `${name1}` and `$name2`
    const re = /\$\{(?<name1>[^}]+)\}|\$(?<name2>\w+)/g;

    return input.replace(re, (match, name1, name2) => {
        var name = name1 || name2;
        return (params[name] && params[name].value) || "";
    });
}

/**
 * Determines if `value` contains a parameter expander.
 * @param {String} value The string to check.
 * @return {Boolean} true if the string contains a parameter expander
 */
function containsParameter(value) {
    return typeof(value) === "string" && value.includes("$");
}
