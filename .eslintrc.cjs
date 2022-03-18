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
  },

  // 用于解决组件名字必须要是连字符
  overrides: [
    {
      files: ['src/views/**/*.vue'],
      rules: {
        'vue/multi-word-component-names': 0
      }
    }
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'no-debugger': 'off'
  }
}
