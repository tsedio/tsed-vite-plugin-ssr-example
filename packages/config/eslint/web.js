module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: ["react-app", "react-app/jest", "plugin:jsx-a11y/strict", "plugin:tailwindcss/recommended", "plugin:prettier/recommended"],
  plugins: ["workspaces", "simple-import-sort", "tailwindcss", "jsx-a11y"],
  rules: {
    "@typescript-eslint/no-unused-vars": "error",
    "import/no-anonymous-default-export": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "workspaces/no-absolute-imports": "error"
  }
};
