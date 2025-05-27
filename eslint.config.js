// https://docs.expo.dev/guides/using-eslint/
import expoConfig from 'eslint-config-expo/flat.js';
import prettier from 'eslint-plugin-prettier';
// import reactPerfPlugin from 'eslint-plugin-react-perf'; // Uncomment for React performance rules
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  // Global ignores
  globalIgnores(['dist', 'build', 'node_modules', 'ios', 'android']),

  // Base Expo configuration (includes JS, TS, React configs)
  expoConfig,

  {
    files: ['**/*.{ts,tsx}'],
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.expo/**',
      '**/build/**',
      '**/coverage/**',
    ],
    plugins: {
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
      prettier,
      // TODO: Probably will implement in the future
      // 'react-perf': reactPerfPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-curly-brace-presence': ['error', { props: 'always' }],
      'react/jsx-no-undef': 'error',

      // TODO: Probably will implement in the future
      // 'react/jsx-no-bind': [
      //   'warn',
      //   {
      //     ignoreDOMComponents: true,
      //     ignoreRefs: false,
      //     allowArrowFunctions: false,
      //     allowFunctions: false,
      //     allowBind: false,
      //   },
      // ],
      // 'react-perf/jsx-no-new-object-as-prop': 'warn',
      // 'react-perf/jsx-no-new-array-as-prop': 'warn',
      // 'react-perf/jsx-no-new-function-as-prop': 'warn',
      // 'react-perf/jsx-no-jsx-as-prop': 'warn',

      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'unused-imports/no-unused-imports': 'error',

      'no-unreachable': 'warn',
      'no-console': ['warn', { allow: ['error'] }],
      'no-undef': 'error',
      curly: 'warn',

      'prettier/prettier': 'error',
    },
  },
]);
