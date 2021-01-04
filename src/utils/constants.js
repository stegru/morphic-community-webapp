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

var catalog = {
    make: {
        title: "Make a button",
        defaultIcon: undefined
    },
    call: {
        title: "Call a Person",
        defaultIcon: undefined
    },
    meeting: {
        title: "Meeting Room",
        defaultIcon: "comments"
    },
    action: {
        title: "Action Buttons",
        defaultIcon: undefined
    },
    "local-calendar": {
        title: "Calendar - App on Computer",
        defaultIcon: "calendar$calendar"
    },
    calendar: {
        title: "Calendar - Website",
        defaultIcon: "calendar$calendar"
    },
    socialMedia: {
        title: "Social Media Sites",
        defaultIcon: undefined
    },
    "local-email": {
        title: "Email - App on Computer",
        defaultIcon: undefined
    },
    email: {
        title: "Email - Websites",
        defaultIcon: "email$envelope"
    },
    photo: {
        title: "Photo Sharing",
        defaultIcon: undefined
    },
    news: {
        title: "News",
        defaultIcon: "newspaper"
    },
    shopping: {
        title: "Shopping",
        defaultIcon: undefined
    },
    multimedia: {
        title: "Media",
        defaultIcon: undefined
    },
    onlineFileDrives: {
        title: "Online Drives",
        defaultIcon: undefined
    }
};

/**
 * Gets the items for the given subkind
 * @param {String} subkind The subkind id (button.configuration.subkind).
 * @return {Array<BarItem>} The items for the subkind.
 */
function getGroupItems(subkind) {
    var result = {};
    for (const [key, button] of Object.entries(allButtons)) {
        if (button.subkind === subkind) {
            button.configuration.catalogItem = true;
            if (!button.configuration.image_url) {
                button.configuration.image_url = catalog[subkind].defaultIcon;
            }
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
            subkind: subkind,
            isPlaceholder: true,
            configuration: {
                label: "Website",
                catalogLabel: "More",
                image_url: catalog[subkind].defaultIcon
            }
        };
        result.more = placeHolder;
    }

    return result;
}

/**
 * @type {Object<String,Object<String,BarItem>>} Button catalog.
 */
export const buttonCatalog = {};
export const groupedButtons = {};

Object.keys(catalog).forEach(key => {
    groupedButtons[key] = (buttonCatalog[catalog[key].title] = getGroupItems(key));
});
