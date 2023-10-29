module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "no-await-in-loop": "off",
    "import/extensions": "off",
    "import/no-dynamic-require": "off",
    "import/no-unresolved": "off",
    "radix": "off",
    "no-restricted-syntax": "off",
    "guard-for-in": "off",
    "array-callback-return": "off",
    "eqeqeq": "off",
    "no-undef": "off",
    "no-unused-vars": "off",
    "react/prop-types": "off"
  },
}
