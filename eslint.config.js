[
  {
    root: true,
    env: {
      node: true,
      es2021: true,
      jest: true, // Enables Jest global variables like `test`, `expect`, etc.
    },
    extends: [
      "eslint:recommended", // Base ESLint rules
      "plugin:jest/recommended", // Recommended Jest rules
    ],
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: ["jest"], // Add a custom plugin

    rules: {
      // Add or override rules here
      "jest/no-disabled-tests": "warn", // Warns about disabled tests
      "jest/no-focused-tests": "error", // Prevents focused tests
      "jest/no-identical-title": "error", // Ensures unique test titles
    },
  },
];
