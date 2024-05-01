module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "6", sourceType: "module" },
  plugins: ["react-refresh", "unused-imports", "import", "react"],
  settings: {
    "import/resolver": {
      typescript: {},
    },
    "import/ignore": [],
    react: {
      version: "detect",
    },
  },
  rules: {
    "react-refresh/only-export-components": "warn",
    "no-import-assign": "error",
    "unused-imports/no-unused-imports-ts": "error",
    "react/display-name": "off",
    "import/no-unresolved": "error",
    "import/first": "error",
  },
};
