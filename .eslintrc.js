module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    '@nuxtjs',
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier', 'vue'],
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
    'vue/singleline-html-element-content-newline': 0,
    'vue/multiline-html-element-content-newline': 0,
    'vue/multi-word-component-names': 0,
    // 'vue/html-closing-bracket-newline': 0,
    /*****************
     * Nuxt Rules
     ****************/
    'nuxt/no-cjs-in-config': 0,
  },
};
