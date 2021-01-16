import * as params from "./params.js";

/**
 * Checks a bar for problems.
 * @param {BarDetails} bar The bar.
 * @return {Boolean} true if the bar has no problems.
 */
export function checkBar(bar) {

    if (!bar || !bar.items) {
        return;
    }

    const errors = [];

    // Check for duplicate items.
    errors.push.apply(errors, checkDuplicates(bar));

    bar.items.forEach((item) => {
        // Validation
        const errorMessage = params.getValidationError(item);
        if (errorMessage) {
            errors.push({
                item: item,
                type: "validation",
                message: errorMessage
            });
        }
    });


    var keys;
    errors.forEach(err => {
        err.key = `${err.item.id}-${err.type}-${err.message}`;
        keys += err.key;
    });

    bar.errors = errors;
    bar.errors.errorKey = keys;
    return errors.length === 0;
}

/**
 * Checks a bar for duplicate items.
 * @param {BarDetails} bar The bar.
 * @return {Array<BarError>} The list of errors.
 */
function checkDuplicates(bar) {

    /** @type {Array<BarError>} */
    const errors = [];

    bar.items.forEach(item => delete item.configuration.duplicates);

    const max = bar.items.length - 1;
    for (let outerIndex = 0; outerIndex <= max; outerIndex++) {
        const a = bar.items[outerIndex];
        const dups = [];

        for (let innerIndex = outerIndex + 1; innerIndex <= max; innerIndex++) {
            const b = bar.items[innerIndex];
            if (itemSimilar(a, b)) {
                dups.push(b);
            }
        }

        if (dups.length > 0) {
            errors.push({
                item: a,
                duplicates: dups,
                type: "duplicate",
                level: "warn",
                message: "Duplicated action."
            });
        }

    }

    return errors;
};

/**
 * Checks if two items are similar.
 * @param {BarItem} a A bar item.
 * @param {BarItem} b Another bar item.
 * @return {Boolean} true if both bars have the same action.
 */
function itemSimilar(a, b) {
    var similar = false;
    if (a.kind === b.kind) {
        switch (a.kind) {
        case "link":
            similar = a.configuration.url === b.configuration.url;
            break;
        case "application":
            similar = a.configuration.exe && a.configuration.exe === b.configuration.exe;
            similar = similar || (a.configuration.default && a.configuration.default === b.configuration.default);
            break;
        case "action":
            similar = a.configuration.identifier === b.configuration.identifier;
            break;
        }
    }

    return similar;
};
