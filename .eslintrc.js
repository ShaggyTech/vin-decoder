module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
    '@nuxtjs/eslint-config-typescript'
  ],
  plugins: [
    'prettier'
  ],
  // add your custom rules here
  rules: {
    /*****************
     * ESLint Rules
     ****************/
    'semi': 0,
    'space-before-function-paren': 0,
    /*****************
     * Vue Rules
     ****************/
    'vue/html-self-closing': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/multiline-html-element-content-newline': 0,
    'vue/html-closing-bracket-newline': 0,
    /*****************
     * Nuxt Rules
     ****************/
    'nuxt/no-cjs-in-config': 0,
  }
}
