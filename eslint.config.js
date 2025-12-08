import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'

import prettier from 'eslint-config-prettier'
import pluginPrettier from 'eslint-plugin-prettier'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: {
      js,
      prettier: pluginPrettier,
    },
    extends: ['js/recommended', prettier],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-unused-vars': 'warn',
      'no-undef': 'error',
    },
    ignores: ['dist'],
  },
])
