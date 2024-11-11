module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  overrides: [
    {
      files: [
        'cypress/e2e/**.{cy,spec}.{js,ts,jsx,tsx}'
      ],
      'extends': [
        'plugin:cypress/recommended'
      ]
    }
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  "compilerOptions": {
    "jsx": "react"
  },
  "include": [
    "src/**/*"
  ],
  rules: {
    "react/no-unused-vars": "error",
    "import/no-unused-modules": "error",
    'prettier/prettier': 'off',
  },
}
