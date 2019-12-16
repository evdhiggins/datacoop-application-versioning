module.exports = {
  env: {
      browser: true,
      node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
      'plugin:@typescript-eslint/recommended',
      'prettier/@typescript-eslint',
      'plugin:prettier/recommended',
  ],
  parserOptions: {
      project: ['tsconfig.json', 'tests/tsconfig.json'],
      ecmaVersion: 2018,
      sourceType: 'module',
  },
  rules: {
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/consistent-type-definitions': 'error',
      '@typescript-eslint/interface-name-prefix': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      'no-console': 'off',
      'no-unused-expressions': 'error',
      '@typescript-eslint/camelcase': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
  },
}