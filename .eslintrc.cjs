module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  settings: {
    react: {
      version: "detect", // React version. "detect" automatically picks the version you have installed.
    },
  },
  plugins: ["@typescript-eslint"],
  rules: {
    // I prefer to use named export
    // See: https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/no-named-as-default.md#importno-named-as-default
    "import/prefer-default-export": 0,

    // Ignore test files per the docs
    // See: https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md#options
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "**/*.test.+(ts|tsx|js|jsx)",
          "**/*.spec.+(ts|tsx|js|jsx)",
        ],
      },
    ],
    "import/no-named-as-default": 0,

    // See: https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-non-null-assertion.md
    "@typescript-eslint/no-non-null-assertion": 0,

    // See: https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md
    "@typescript-eslint/explicit-function-return-type": 0,

    // See: https://eslint.org/docs/rules/no-unused-expressions
    "no-unused-expressions": ["error", { allowShortCircuit: true }],

    // First import is the React package, just to follow the standard convention.
    // See: https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal"],
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before",
          },
          {
            pattern: "*.+(css|sass|less|scss|pcss|styl)",
            group: "index",
            patternOptions: { matchBase: true },
            position: "after",
          },
        ],
        pathGroupsExcludedImportTypes: ["react"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    // In React v17.0, a new JSX transform was introduced, which automatically imports special functions from the React package’s new entry points, removing the need to import React in every file that uses JSX explicitly.
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
  },
};
