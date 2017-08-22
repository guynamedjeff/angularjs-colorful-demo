module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "globals": {
      "angular": 1,
      "require": 1,
      "__dirname": 1,
      "process": 1,
      "module": 1
    },
    "rules": {
        "no-console": 0,
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error"
        ],
        "no-unused-vars": [
          "error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }
        ]
    }
};
