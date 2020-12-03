import { CONFIG } from "@/config/config";
import { allButtons as allButtonsSrc } from "./allButtons.js";
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
    successfulLogin: "Successfully logged in",
    successfulRegistration: "Registration completed successfully",
    successfulReset: "Reset password successful",
    emailValidationError: "This is a required field and must be a valid email address.",
    successfulSave: "Successfully saved",
    barUpdated: "Bar successfully saved.",
    barAdded: "Bar successfully added, you will be returned to Dashboard soon...",
    sessionTimedOut: "Your session was expired. Please login again.",
    leavePageAlert: "Do you really want to leave? You have unsaved changes!",
    logoutAlert: "Please save, or discard your chances before logging out!",
    successfulRoleChange: "Member role changed successfully",
    successfulMemberDelete: "Member deleted successfully, you will be returned to Dashboard soon...",
    successfulBarDelete: "Bar successfully deleted, you will be returned to Dashboard soon..."
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

// You can check the provenance of the icons in the following spreadsheet:
// https://docs.google.com/spreadsheets/d/1pIb2_cjtCi1nybtRAEL-wFUv6Yv0gxqYipmTGTxCsyE/
export const icons = {
    bootstrap: "bootstrap.svg",
    gmail: "gmail.svg",
    outlook: "outlook.svg",
    "yahoo-mail": "yahoo-mail.svg",
    envelope: "envelope.svg",
    "envelope-open": "envelope-open.svg",
    "envelope-open-text": "envelope-open-text.svg",
    "envelope-outline": "envelope-outline.svg",
    "envelope-outline-open": "envelope-outline-open.svg",
    facebook: "facebook.svg",
    nextdoor: "logo_nextdoor.svg",
    pinterest: "logo_pinterest.svg",
    twitter: "twitter.svg",
    imgur: "logo_imgur.svg",
    instagram: "logo_instagram.svg",
    linkedin: "logo_linkedIn.svg",
    reddit: "reddit.svg",
    tumblr: "logo_tumblr.svg",
    paypal: "paypal.svg",
    skype: "skype.svg",
    "google-calendar": "logo_googleCalendar.svg",
    icloud: "logo_icloud.svg",
    aolmail: "logo_aolOld.svg",
    telegram: "telegram.svg",
    viber: "viber.svg",
    whatsapp: "whatsapp.svg",
    youtube: "youtube.svg",
    cnn: "logo_cnn.svg",
    foxnews: "logo_foxNews.svg",
    "google-news": "logo_googleNews.svg",
    nytimes: "logo_newYorkTimes.svg",
    "the-washington-post": "logo_washingtonPost.svg",
    yahoo: "logo_yahoo.svg",
    abcnews: "logo_abcNews.svg",
    aljazeera: "logo_alJazeera.jpg",
    bbc: "logo_bbc.svg",
    bloomberg: "logo_bloomberg.svg",
    cbsnews: "logo_cbsNews.svg",
    cnbc: "logo_cnbc.svg",
    drudgereport: "logo_drudgeReport.svg",
    forbes: "logo_forbes.svg",
    theguardian: "logo_theGuardian.svg",
    thehill: "logo_theHill.jpeg",
    huffpost: "logo_huffpost.svg",
    latimes: "logo_laTimes.svg",
    nbcnews: "logo_nbcNews.svg",
    npr: "logo_npr.svg",
    reuters: "logo_reuters.svg",
    usatoday: "logo_usaToday.svg",
    wsj: "logo_wsj.svg",
    amazon: "logo_amazon.svg",
    craigslist: "logo_craigslist.svg",
    ebay: "logo_ebay.png",
    etsy: "logo_etsy.svg",
    bestbuy: "logo_bestBuy.svg",
    kohls: "logo_kohls.svg",
    macys: "logo_macys.svg",
    target: "logo_target.svg",
    walmart: "logo_walmart.svg",
    wayfair: "logo_wayfair.png",
    netflix: "logo_netflix.svg",
    pandora: "logo_pandora.jpg",
    spotify: "logo_spotify.svg",
    "amazon-music": "logo_amazonMusic.png",
    itunes: "logo_itunes.svg",
    deezer: "logo_deezer.svg",
    "disney-plus": "logo_disneyPlus.svg",
    hulu: "logo_hulu.svg",
    iheart: "logo_iheartRadio.svg",
    soundcloud: "logo_soundcloud.svg",
    tidal: "logo_tidal.png",
    vimeo: "logo_vimeo.svg",
    "youtube-music": "logo_youtubeMusic.svg",
    box: "logo_box.svg",
    dropbox: "logo_dropbox.svg",
    "google-drive": "logo_googleDrive.svg",
    "one-drive": "logo_onedrive.svg"
};

export const subkindIcons = {
    gmail: ["gmail", "envelope", "envelope-open", "envelope-open-text", "envelope-outline", "envelope-outline-open"],
    outlook: ["outlook", "envelope", "envelope-open", "envelope-open-text", "envelope-outline", "envelope-outline-open"],
    "yahoo-mail": ["yahoo-mail", "envelope", "envelope-open", "envelope-open-text", "envelope-outline", "envelope-outline-open"],
    aolmail: ["envelope", "envelope-open", "envelope-open-text", "envelope-outline", "envelope-outline-open"]
};

Object.values(allButtonsSrc).forEach(params.prepareBarItem);

/**
 * All defined buttons.
 */
export const allButtons = allButtonsSrc;

var catalog = {
    "Make a button": "make",
    "Call a Person": "call",
    "Meeting Room": "meeting",
    "Action Buttons": "action",
    "Calendar - App on Computer": "local-calendar",
    "Calendar - Website": "calendar",
    "Social Media Sites": "socialMedia",
    "Email - App on Computer": "local-email",
    "Email - Websites": "email",
    "Photo Sharing": {
        "Google Photos": {
            kind: "link",
            is_primary: true,
            configuration: {
                subkind: "google-photos",
                label: "Google Photos",
                color: colors.blue,
                image_url: "google-photos",
                url: "https://photos.google.com",
                description: "Opens your Google Photos in a browser."
            }
        }
    },
    News: "news",
    Shopping: "shopping",
    Media: "multimedia",
    "Online Drives": "onlineFileDrives"
};

/**
 * Gets the items for the given category
 * @param {String} category The category id (button.configuration.category).
 * @return {Array<BarItem>} The items for the category.
 */
function getGroupItems(category) {
    var getHost = /.*:\/\/([^/:]+)/;
    var result = {};
    for (const [key, button] of Object.entries(allButtons)) {
        if (button.configuration.category === category) {
            if (typeof(button.configuration.color) === "string") {
                button.configuration.color = colors[button.configuration.color];
            }

            // Use the site's favicon if there's no local image.
            if (!button.configuration.image_url && button.configuration.url) {
                var m = getHost.exec(button.configuration.url);
                if (m) {
                    button.configuration.image_url = `https://icons.duckduckgo.com/ip2/${m[1]}.ico`;
                }
            }

            if (typeof(button.configuration.image_url) === "string") {
                if (button.configuration.image_url.indexOf("/") === -1) {
                    button.configuration.image_url = "/icons/" + button.configuration.image_url;
                }
            }

            button.configuration.catalogItem = true;

            result[key] = button;
        }
    }
    return result;
}

Object.keys(catalog).forEach(key => {
    if (typeof(catalog[key]) === "string") {
        catalog[key] = getGroupItems(catalog[key]);
    }
});

/**
 * @type {Object<String,Object<String,BarItem>>} Button catalog.
 */
export const buttonCatalog = catalog;
