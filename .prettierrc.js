// @ts-check

/** @type {import("@serverless-guru/prettier-plugin-import-order").PrettierConfig} */
module.exports = {
  plugins: ['@serverless-guru/prettier-plugin-import-order'],
  printWidth: 100,
  semi: false,
  singleQuote: true,
  trailingComma: 'all',

  // Sort and group imports using the @serverless-guru/prettier-import-order plugin.
  // https://github.com/serverless-guru/prettier-import-order
  //
  // See documentation and usage: https://www.npmjs.com/package/@serverless-guru/prettier-plugin-import-order#usage
  importOrder: [
    '^react(-native)?$', // React and react-native stuff goes at the top
    '^tamagui$',
    '', // empty line
    '<THIRD_PARTY_MODULES>', // Third party modules (this is a plugin keyword)
    '',
    '^app/(.*)$',
    '',
    '^../(.*)$',
    '^./(.*)$',
  ],
  importOrderSeparation: false, // turn this on to see the sorting groups.
  importOrderSortIndividualImports: true,
  importOrderMergeDuplicateImports: true,
  importOrderTypeImportsToTop: true, // Set this to false if you want type imports to be sorted with the rest of the imports
  importOrderCaseInsensitive: true,
  importOrderParserPlugins: ['typescript', 'jsx'],
  // End sort options
}
