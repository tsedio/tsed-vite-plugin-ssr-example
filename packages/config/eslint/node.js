module.exports = {
  "parser": "@typescript-eslint/parser",
  "extends": [
    "prettier",
    "plugin:@typescript-eslint/recommended"
  ],
  "plugins": ["@typescript-eslint"],
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module"
  },
  "env": {
    "node": true,
    "es6": true
  },
  "rules": {
    "@typescript-eslint/no-inferrable-types": 0,
    "@typescript-eslint/no-unused-vars": 2,
    "@typescript-eslint/no-var-requires": 0
  }
}
