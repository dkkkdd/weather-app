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
      prettier: pluginPrettier, // ← добавляем плагин
    },
    extends: [
      'js/recommended',
      prettier, // ← добавляем конфиг prettier
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      'prettier/prettier': 'error', // ← заставляет соблюдать форматирование
      'no-unused-vars': 'warn',
      'no-undef': 'error',
    },
    ignores: ['dist'],
  },
])
