const ENV = process.env.NODE_ENV ? process.env.NODE_ENV.toUpperCase() : "LOCAL";

const CONF = {
    LOCAL: {
    // This should be the address of the development server.
        BACKEND_URL: "http://10.0.0.2:8080"
    },
    DEVELOPMENT: {
        BACKEND_URL: "https://api.morphic.dev"
    },
    PRODUCTION: {
        BACKEND_URL: "https://api.morphic.org"
    }
};

export const CONFIG = CONF[ENV];
