import { CONFIG } from "@/config/config";
import { allButtons as allButtonsSrc } from "./allButtons.js";
import { allIcons as allIconsSrc } from "./allIcons.js";
import * as params from "./params.js";

export const API_URL = CONFIG.API_URL;
export const ERROR_MAP = {
    1: "Incorrect username or password!",
    2: "That email address already exists!",
    3: "Username already exists!",
    404: "Cannot connect to the server right now! Please try again in couple of minutes.",
    500: "Network error, cannot connect to the server! Please check your internet connection."
};
export const MESSAGES = {
    successfulRegistration: "Registration completed successfully",
    successfulReset: "Reset password successful",
    emailValidationError: "This is a required field and must be a valid email address.",
    successfulSave: "Successfully saved",
    barUpdated: "Bar successfully saved.",
    barAdded: "Bar successfully added.",
    sessionTimedOut: "Your session was expired. Please login again.",
    leavePageAlert: "Do you really want to leave? You have unsaved changes!",
    logoutAlert: "Please save, or discard your chances before logging out!",
    successfulRoleChange: "Member role changed successfully",
    successfulMemberDelete: "Member deleted successfully.",
    successfulBarDelete: "Bar successfully deleted."
};

export const colors = {
    teal: "#006770",
    blue: "#002957",
    purple: "#662261",
    red: "#8c191b",
    green: "#46622d",
    orange: "#a33e1f",
    default_button: "rgb(0, 47, 87)"
};


/**
 * All icons. Map of iconKey => file
 * @type {Object<String,String>}
 */
export const icons = {};

/**
 * Icons which apply to specific sub-kinds.
 * Map of subkind => array of iconKeys.
 * @type {Object<String,Array<String>>}
 */
export const groupedIcons = {};
groupedIcons.make = [];
Object.keys(allIconsSrc).forEach(iconId => {
    var filename = allIconsSrc[iconId];
    icons[iconId] = filename;

    const isSubKind = iconId.includes("$");
    const isGeneric = !isSubKind && !filename.startsWith("logo_");

    const group = isGeneric
        ? "generic"
        : (isSubKind && iconId.split("$", 2)[0]);

    if (group) {
        if (groupedIcons[group]) {
            groupedIcons[group].push(iconId);
        } else {
            groupedIcons[group] = [iconId];
        }

        // Add all icons to the generic buttons
        groupedIcons.make.push(iconId);
    }
});


/**
 * All defined buttons.
 * @type {Object<String,BarItem>}
 */
export const allButtons = allButtonsSrc;

/**
 * The default icon for each button.
 * @type {Object<String,String>}
 */
export const defaultIcons = {

};

/** Gets the host part of a URL */
const getHost = /.*:\/\/([^/:]+)/;

Object.keys(allButtons).forEach((buttonKey) => {
    const button = allButtons[buttonKey];

    // Fix the color
    if (!button.configuration.color || typeof(button.configuration.color) === "string") {
        button.configuration.color = colors[button.configuration.color || "blue"];
    }

    // Use the site's favicon if there's no local image.
    if (!button.configuration.image_url && button.configuration.url) {
        var m = getHost.exec(button.configuration.url);
        if (m) {
            button.configuration.image_url = `https://icons.duckduckgo.com/ip2/${m[1]}.ico`;
        }
    }

    defaultIcons[buttonKey] = button.configuration.image_url;
    button.buttonKey = buttonKey;
    params.prepareBarItem(button);
});

/**
 * @type {ButtonCatalog} The button catalog.
 */
export const buttonCatalog = {
    make: {
        title: "Make a button",
        editTitle: "Custom Button",
        defaultIcon: undefined,
        related: false
    },
    call: {
        title: "Call a Person",
        editTitle: undefined,
        defaultIcon: undefined
    },
    meeting: {
        title: "Meeting Room",
        editTitle: undefined,
        defaultIcon: "comments"
    },
    action: {
        title: "Action Buttons",
        editTitle: "Action Button",
        defaultIcon: undefined
    },
    "local-calendar": {
        title: "Calendar - App on Computer",
        editTitle: "Calendar App",
        defaultIcon: "calendar$calendar"
    },
    calendar: {
        title: "Calendar - Website",
        editTitle: "Calendar Website",
        defaultIcon: "calendar$calendar",
        more: {
            description: "Create a button to open a calendar site"
        }
    },
    socialMedia: {
        title: "Social Media Sites",
        editTitle: "Social Media Site",
        defaultIcon: undefined,
        more: {
            description: "Create a button to open a social media site"
        }
    },
    "local-email": {
        title: "Email - App on Computer",
        editTitle: "Email App",
        defaultIcon: undefined
    },
    email: {
        title: "Email - Websites",
        editTitle: "Email Website",
        defaultIcon: "email$envelope",
        more: {
            description: "Create a button to open an email site"
        }
    },
    photo: {
        title: "Photo Sharing",
        editTitle: "Photo Sharing Site",
        defaultIcon: undefined,
        more: {
            description: "Create a button to open a photo sharing site"
        }
    },
    news: {
        title: "News",
        editTitle: "News Site",
        defaultIcon: "newspaper",
        more: {
            description: "Create a button to open a news web-site"
        }
    },
    shopping: {
        title: "Shopping",
        editTitle: "Shopping Site",
        defaultIcon: undefined,
        more: {
            description: "Create a button to open a shopping site"
        }
    },
    multimedia: {
        title: "Media",
        editTitle: "Media Site",
        defaultIcon: undefined,
        more: {
            description: "Create a button to open a media site"
        }
    },
    onlineFileDrives: {
        title: "Online Drives",
        editTitle: "Online Drive",
        defaultIcon: undefined,
        more: {
            description: "Create a button to open an online drive site"
        }
    }
};


/**
 * Generates an ID for a button.
 * @param {BarItem} item The button.
 * @return {String} The ID.
 */
function generateId(item) {
    let id = "";
    if (item) {
        id += Math.floor(Math.random() * 10e10);
        id += "-" + item.configuration.label.toLowerCase();
        id += "-" + (item.configuration.subkind ? "sub-" + item.configuration.subkind.toLowerCase() : "generic-kind");
        id += "-" + Math.floor(Math.random() * 10e10);
    }
    return id;
};

/**
 * Gets the items for the given subkind
 * @param {String} subkind The subkind id (button.configuration.subkind).
 * @return {Object<String,BarItem>} The items for the subkind.
 */
function getGroupItems(subkind) {
    var result = {};
    // Get the items with the given subkind.
    for (const [key, button] of Object.entries(allButtons)) {
        if (button.configuration.subkind === subkind) {
            button.configuration.catalogItem = true;
            if (!button.configuration.image_url) {
                button.configuration.image_url = buttonCatalog[subkind].defaultIcon;
            }
            button.id = generateId(button);
            result[key] = button;
        }
    }

    /** @type {Array<BarItem>} */
    const values = Object.values(result);

    // If there aren't any primary buttons, make them all primary.
    const noPrimary = values.every(button => !button.is_primary);
    if (noPrimary) {
        values.forEach(button => { button.is_primary = true; });
    }


    // If there are some non-primary buttons, add a place-holder which shows the selection dialog.
    const hasSecondary = !noPrimary && values.some(button => !button.is_primary);
    if (hasSecondary) {
        /** @type {BarItem} */
        const placeHolder = {
            is_primary: true,
            isPlaceholder: true,
            configuration: {
                subkind: subkind,
                label: buttonCatalog[subkind].editTitle || buttonCatalog[subkind].title,
                catalogLabel: "Other",
                image_url: buttonCatalog[subkind].defaultIcon
            }
        };
        buttonCatalog[subkind].more = Object.assign(placeHolder.configuration, buttonCatalog[subkind].more);
        placeHolder.id = generateId(placeHolder);
        result[`more-${subkind}`] = placeHolder;
    }

    return result;
}

export const groupedButtons = {};

Object.keys(buttonCatalog).forEach(key => {
    const items = getGroupItems(key);
    const group = buttonCatalog[key];
    groupedButtons[key] = (group.items = items);

    // Get the kind of all items, if they're the same
    const values = Object.values(items);
    if (values.length > 0) {
        const kind = values[0].kind;
        if (values.every(button => button.kind === kind || button.isPlaceholder)) {
            group.kind = kind;
        }
    }

    if (!group.related && group.related !== false) {
        group.related = values.length > 1;
    }

});
