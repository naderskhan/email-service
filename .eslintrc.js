module.exports = {
  extends: "airbnb-base",
  "env": {
    "mocha": true
  },
  overrides: [{
    files: "*.test.js",
    rules: {
      "no-unused-expressions": "off",
      "object-shorthand": "off",
      "func-names": "off"
    }
  }],
  rules: {
    "import/prefer-default-export": "off",
    "import/no-dynamic-require": "off",
    "global-require": "off",
    "no-restricted-syntax": "off",
    "no-await-in-loop": "off",
    "quote-props": "off",
  }
};
