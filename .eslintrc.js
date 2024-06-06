module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/ban-ts-comment': 'off',
    'prettier/prettier': [
      'warn',
      {
        semi: true,
        singleQuote: true,
        trailingComma: 'es5',
        printWidth: 80,
      },
    ],
  },
  env: {
    node: true,
    jest: true,
  },
};
