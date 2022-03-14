/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier'
  ],
  // extends: [
  //   'plugin:vue/vue3-essential',
  //   'eslint:recommended',
  //   '@vue/typescript/recommended',
  //   '@vue/prettier',
  //   '@vue/prettier/@typescript-eslint',
  //   'plugin:prettier/recommended'
  // ],
  env: {
    'vue/setup-compiler-macros': true
  }
}
