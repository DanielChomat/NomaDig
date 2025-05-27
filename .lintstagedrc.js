export default {
  // TypeScript files only for ESLint & Prettier
  '*.{ts,tsx}': ['yarn format', 'yarn lint:fix'],
  // JavaScript files only get Prettier
  '*.{js,jsx}': ['yarn format'],
  '*.{json,yml,yaml,md}': ['yarn format'],
  'package.json': ['yarn format'],
  'yarn.lock': ['yarn format'],
};
