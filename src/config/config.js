const ENV = process.env.NODE_ENV ? process.env.NODE_ENV.toUpperCase() : "LOCAL";

const CONF = {
    LOCAL: {
        // Local development server will redirect all API requests (/v1/*) to the local API server (see vue.config.js)
        API_URL: process.env.VUE_APP_API_URL ?? new URL(location.href).origin
    },
    DEVELOPMENT: {
        API_URL: "https://api.morphic.dev"
    },
    PRODUCTION: {
        API_URL: "https://api.morphic.org"
    }
};

export const CONFIG = CONF[ENV];
