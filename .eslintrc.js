module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ['prettier'],
  extends: ['@nuxtjs/eslint-config-typescript', 'plugin:prettier/recommended'],
  // add your custom rules here
  rules: {
    /*****************
     * ESLint Rules
     ****************/
    semi: 0,
    'space-before-function-paren': 0,
    'arrow-parens': ['error', 'always'],
    /*****************
     * Vue Rules
     ****************/
    // 'vue/html-self-closing': 0,
    // 'vue/singleline-html-element-content-newline': 0,
    // 'vue/multiline-html-element-content-newline': 0,
    'vue/multi-word-component-names': 0,
    // 'vue/html-closing-bracket-newline': 0,
    /*****************
     * Nuxt Rules
     ****************/
    // 'nuxt/no-cjs-in-config': 0,
  },
};
