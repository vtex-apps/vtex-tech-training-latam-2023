module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  plugins: ['@typescript-eslint', 'lodash', 'prettier'],

  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  globals: {
    __DEV__: true,
  },

  rules: {
    'prettier/prettier': 'error',
    'lodash/import-scope': [2, 'method'],
    'no-console': ['error', { allow: ['warn', 'error'] }],

    // waiting for https://github.com/typescript-eslint/typescript-eslint/issues/50
    '@typescript-eslint/explicit-function-return-type': 'off',

    '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],
  },
}
