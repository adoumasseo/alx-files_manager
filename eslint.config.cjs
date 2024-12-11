// eslint.config.cjs
module.exports = [
    {
      ignores: ["node_modules/"],
    },
    {
      files: ["**/*.js"],
      languageOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      rules: {
        "no-unused-vars": "warn",
        "eqeqeq": "error",
      },
    },
  ];