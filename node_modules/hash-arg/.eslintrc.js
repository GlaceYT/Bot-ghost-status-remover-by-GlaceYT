module.exports = {
    "env": {
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "plugins": [
        "jsdoc",
    ],
    "rules": {
        "no-unused-vars": "warn",
        "indent": [
            "error",
            4
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "jsdoc/check-alignment": 1, // Recommended
        "jsdoc/check-examples": "off",
        "jsdoc/check-indentation": "off",
        "jsdoc/check-param-names": 1, // Recommended
        "jsdoc/check-syntax": "off",
        "jsdoc/check-tag-names": 1, // Recommended
        "jsdoc/check-types": 1, // Recommended
        "jsdoc/implements-on-classes": 1, // Recommended
        "jsdoc/match-description": 1,
        "jsdoc/newline-after-description": 1, // Recommended
        "jsdoc/no-types": "off",
        "jsdoc/no-undefined-types": 1, // Recommended
        "jsdoc/require-description": "off",
        "jsdoc/require-description-complete-sentence": "off",
        "jsdoc/require-example": "off",
        "jsdoc/require-hyphen-before-param-description": "off",
        "jsdoc/require-jsdoc": 1, // Recommended
        "jsdoc/require-param": 1, // Recommended
        "jsdoc/require-param-description": 1, // Recommended
        "jsdoc/require-param-name": 1, // Recommended
        "jsdoc/require-param-type": 1, // Recommended
        "jsdoc/require-returns": 1, // Recommended
        "jsdoc/require-returns-check": 1, // Recommended
        "jsdoc/require-returns-description": 1, // Recommended
        "jsdoc/require-returns-type": 1, // Recommended
        "jsdoc/valid-types": 1 // Recommended
    }
};