// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactCompiler from 'eslint-plugin-react-compiler'

export default tseslint.config(
  eslint.configs.recommended,
  [...tseslint.configs.recommended,
  {
    plugins: {
      'react-compiler': reactCompiler,
    },
    rules: {
      'react-compiler/react-compiler': 'error',
    }
  }
  ]
);

// export default [{
//   "env": {
//     "browser": true,
//     "es6": true,
//     "node": true
//   },
//   "extends": [
//     "eslint:recommended",
//     "plugin:react/recommended",
//     "plugin:jsx-a11y/recommended",
//     "plugin:vitest/recommended"
//   ],
//   "globals": {
//     "Atomics": "readonly",
//     "SharedArrayBuffer": "readonly"
//   },
//   "parser": "@typescript-eslint/parser",
//   "parserOptions": {
//     "ecmaFeatures": {
//       "jsx": true
//     },
//     "ecmaVersion": 2018,
//     "sourceType": "module"
//   },
//   plugins: {jsx-a11y, 
//     "@typescript-eslint", "react", "testcafe", "typescript"},
//   "rules": {
//     "no-console": "error",
//     "max-len": [
//       "error",
//       160,
//       {
//         "ignoreUrls": true,
//         "ignoreComments": false,
//         "ignoreRegExpLiterals": true,
//         "ignoreStrings": false,
//         "ignoreTemplateLiterals": false
//       }
//     ],
//     "comma-dangle": [
//       "error",
//       {
//         "arrays": "only-multiline",
//         "objects": "only-multiline",
//         "imports": "only-multiline",
//         "exports": "only-multiline",
//         "functions": "only-multiline"
//       }
//     ],
//     // "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
//     // "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
//     "object-curly-spacing": ["warn", "always"],
//     "no-duplicate-imports": "error",
//     "no-case-declarations": "error",
//     "quotes": ["warn", "single", { "avoidEscape": true }],
//     "no-unused-vars": "off",
//     "@typescript-eslint/no-unused-vars": "error",
//     "complexity": ["warn", 200]
//   },
//   "overrides": [
//     {
//       "files": ["*.ts*"],
//       "rules": {
//         "no-undef": "off"
//       }
//     }
//   ],
//   "settings": {
//     "react": {
//       "version": "detect"
//     }
//   },
//   ignores: ["node_modules",
//     "dist",
//     "coverage"],
// }];
