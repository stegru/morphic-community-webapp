/*

Some bar items require extra information. A field in the button configuration object can have a named placeholder
in the text (like $value or `${value}`).

These placeholders are extracted from the fields, the name being a key in the `allParameters` object.
These are then used to create input fields in the editor dialog.

*/

/**
 * The parameters of a bar item.
 * @typedef {Array<ParameterInfo>|Object<String,ParameterInfo>} ItemParameters
 */

/**
 * A parameter.
 * @typedef {Object} ParameterInfo
 * @property {Any} initial The initial value.
 * @property {String} label Text displayed with the input field.
 * @property {Array<Object>} [selectOptions] A list of items for a select field.
 * @property {String} attrs The HTML attributes for the input element.
 * @property {Function} [isApplicable] A function, returning true if the field should be shown.
 * @property {Function} [isEnabled] A function, returning true if the field should be enabled.
 * @property {Object<String,Object>} validation The validation rules.
 */

/**
 *
 * @type {Object<String,ParameterInfo>}
 */
export const allParameters = {
    label: {
        // This is used automatically by all items.
        label: "Text on the button",
        validation: {
            required: "Button label is required."
        }
    },
    url: {
        label: "The site to open",
        attrs: {
            autocomplete: "url",
            type: "url"
        },
        validation: {
            required: "Site link is required."
        }
    },
    skypeId: {
        label: "Skype ID of who to call"
    },
    skypeAction: {
        label: "Type of call",
        initial: "call",
        isEnabled: (button) => !!button.data.parameters.skypeId,
        selectOptions: [
            { value: "call", text: "Voice" },
            { value: "call&video=true", text: "Video" },
            { value: "chat", text: "Chat" }
        ]
    },
    defaultApp: {
        label: "App",
        initial: null,
        selectOptions: [
            { value: undefined, text: "Custom application"}
        ],
        validation: {
            defaultAppRequired: "An App needs to be chosen"
        }
    },
    exe: {
        label: "Executable",
        isApplicable: (button) => !button.data.parameters.defaultApp && button.data.parameters.defaultApp !== "",
        validation: {
            required: "The executable file is required."
        }
    }
};

/**
 * Returns a function which will return the given constant value.
 * @param {Any} result The constant value.
 * @return {Function} A function which returns `result`.
 */
function constantFunction(result) {
    return function () {
        return result;
    };
}

Object.values(allParameters).forEach(
    /**
     * Fix the parameter details so the isApplicable and isEnabled functions exist.
     * @param {ParameterInfo} paramInfo The parameter.
     */
    (paramInfo) => {
        if (typeof(paramInfo.isApplicable) !== "function") {
            paramInfo.isApplicable = constantFunction(paramInfo.isApplicable === undefined ? true : paramInfo.isApplicable);
        }
        if (typeof(paramInfo.isEnabled) !== "function") {
            paramInfo.isEnabled = constantFunction(paramInfo.isEnabled === undefined ? true : paramInfo.isEnabled);
        }
    });

/**
 * Validation routines, referred to by the keys of a parameters `validation` object in `allParameters`.
 */
const validators = {
    /**
     * Checks if a field has a value.
     * @param {Any} value The field value to check.
     * @return {Boolean} true if the field has a value.
     */
    required(value) {
        return value && value !== "";
    },
    /**
     * Checks if the defaultApp field has a value.
     * @param {Any} value The defaultApp field value to check.
     * @return {Boolean} true if the field has a value.
     */
    defaultAppRequired(value) {
        return value !== "";
    }
};

const origFieldPrefix = "_orig_";

/**
 * Prepares the parameter information on a button, during initial load.
 * @param {BarItem} button The button.
 */
export function prepareBarItem(button) {
    /** @type {ItemParameters} */
    const params = {};
    const paramFields = [];

    // Always allow the label field to be edited.
    const initialLabel = button.configuration.label;
    button.configuration.label = "$label";

    Object.keys(button.configuration).forEach(key => {
        const value = button.configuration[key];
        if (key !== "image_url" && containsParameter(value)) {
            // Create an original copy of the field (the field will be over-written by the expanded string)
            button.configuration[`${origFieldPrefix}${key}`] = value;

            // Extract the parameters
            getParameterNames(value).forEach(paramKey => {
                var paramInfo = allParameters[paramKey];
                if (!paramInfo) {
                    // This parameter is unknown
                    paramInfo = (allParameters[paramKey] = {
                        label: paramKey
                    });
                }
                params[paramKey] = paramInfo.initial || "";
            });

            paramFields.push(key);
        }
    });

    if (params.label !== undefined) {
        // Set the value of the label to what it already was.
        delete params.label; // Delete it, so it's at the bottom of the dialog.
        params.label = initialLabel;
    }

    button.data.paramFields = paramFields;
    button.data.parameters = params;

    setInitial(button);
}

/**
 * Set the initial values of the parameters.
 *
 * @param {BarItem} button The button.
 */
export function setInitial(button) {
    Object.keys(button.data.parameters).forEach(paramKey => {
        const initialValue = allParameters[paramKey].initial;
        if (initialValue !== undefined) {
            button.data.parameters[paramKey] = initialValue;
        }
    });

    applyParameters(button);
}

/**
 * Apply the parameter values to the button fields. Call whenever a value in the button's parameters object has changed.
 *
 * @param {BarItem} button The bar item.
 */
export function applyParameters(button) {
    const params = button.data.parameters;

    if (button.data.paramFields) {
        button.data.paramFields.forEach(key => {
            button.configuration[key] = replaceParameters(params, button.configuration[`${origFieldPrefix}${key}`]);
        });
    }

    button.data.hasError = validate(button) ? undefined : true;
}

// Matches all `${name1}` or `$name2` in a string.
const matchExpanders = /\$\{(?<name1>[^}]+)\}|\$(?<name2>\w+)/g;

/**
 * Gets the parameter expanders in a string.
 *
 * @param {String} input The string to examine.
 * @return {Array<String>} The parameter names.
 */
function getParameterNames(input) {
    const paramNames = [];
    var match;
    while ((match = matchExpanders.exec(input))) {
        paramNames.push(match.groups.name1 || match.groups.name2);
    }

    return paramNames;
}

/**
 * Replaces the parameter expanders with the appropriate value.
 * @param {ItemParameters} params The parameter data.
 * @param {String} input The string to work on.
 * @return {String} The input string, with the parameter expanders replaced with their value.
 */
function replaceParameters(params, input) {
    return input.replace(matchExpanders, (match, name1, name2) => {
        var name = name1 || name2;
        return params[name] || "";
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

/**
 * Validates all parameters of a button.
 * @param {BarItem} button The button.
 * @return {Boolean} true if valid.
 */
function validate(button) {
    return button.data.isPlaceholder || Object.keys(button.data.parameters).every((paramKey) => {
        return !getValidationError(button, paramKey);
    });
}

/**
 * Validate a parameter field in the button edit dialog.
 * @param {BarItem} button The button.
 * @param {String} [paramKey] The parameter key, or omit to check all parameters until the first failure.
 * @return {String} The validation error message (or null if valid)
 */
export function getValidationError(button, paramKey) {
    let errorMessage;

    if (button.data.isPlaceholder) {
        errorMessage = "An action for this item has not been set.";
    } else if (paramKey === undefined) {
        Object.keys(button.data.parameters).every((paramKey) => {
            errorMessage = getValidationError(button, paramKey);
            return !errorMessage;
        });
    } else {
        const paramInfo = allParameters[paramKey];
        const value = button.data.parameters[paramKey];

        const validate = paramInfo.isApplicable(button) && paramInfo.isEnabled(button);

        if (validate && paramInfo.validation) {
            Object.keys(paramInfo.validation).every(key => {
                const validator = validators[key];
                var ok = false;
                if (validator) {
                    if (typeof(validator) === "function") {
                        ok = validator(value, button);
                    } else if (validator instanceof RegExp) {
                        ok = validator.test(value);
                    }
                }

                if (!ok) {
                    var v = paramInfo.validation[key];
                    errorMessage = (typeof(v) === "string") ? v : v.message || "error";
                }
                return ok;
            });
        }
    }
    return errorMessage;
}
