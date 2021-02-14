module.exports = {
  extends: ["airbnb-typescript-prettier"], // if you're using typescript,
  parserOptions: {
    project: "./tsconfig.json",
    sourceType: "module",
  },
  ignorePatterns: ['.eslintrc.js'], // !!! new and important part !!!
  rules: {
    // I prefer to use named export
    // See: https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default.md#importno-named-as-default
    "import/prefer-default-export": 0,

    // Ignore test files per the docs
    // See: https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md#options
    "import/no-extraneous-dependencies": [
      "error", {"devDependencies": ["**/*.test.+(ts|tsx|js|jsx)", "**/*.spec.+(ts|tsx|js|jsx)"]}],
    "import/no-named-as-default": 0,

    // See: https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-non-null-assertion.md
    "@typescript-eslint/no-non-null-assertion": 0,

    // See: https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md
    "@typescript-eslint/explicit-function-return-type": 0,

    // See: https://eslint.org/docs/rules/no-unused-expressions
    "no-unused-expressions": ["error", { "allowShortCircuit": true }],

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
  },
  // plugins: ['prettier'],
};
