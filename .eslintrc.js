module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: [
    "plugin:vue/essential",
    "@vue/standard",
    "eslint-config-fluid",
    "plugin:jsdoc/recommended"
  ],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "dot-notation": [
      "error",
      {
        "allowKeywords": true
      }
    ],
    "jsdoc/require-jsdoc": 0,
    "jsdoc/newline-after-description": 0,
    "jsdoc/no-undefined-types": 0, // https://github.com/gajus/eslint-plugin-jsdoc/issues/99

  }
};
