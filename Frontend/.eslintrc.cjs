module.exports = {
    env: {
      browser: true,
      es2021: true
    },
    overrides: [
    ],
    extends: [
      'plugin:react/recommended',
      'standard-with-typescript'
    ],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      project: './tsconfig.json'
    },
    rules: {
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off'
    },
    plugins: [
      'react'
    ]
  }