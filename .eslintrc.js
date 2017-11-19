module.exports = {
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: [
    'standard',
    'plugin:flowtype/recommended',
    'plugin:vue/recommended'
  ],
  plugins: ['flowtype', 'html'],
  root: true,
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2017,
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "import/no-unresolved": 0,
    "import/no-unassigned-import": 0,
    "vue/html-no-self-closing": "error",
    "semi": ["error", "never"],
    "no-console": "off",
    "space-before-function-paren": [
      "error",
      {
        "anonymous": "always",
        "named": "always",
        "asyncArrow": "always"
      }
    ]
  }
}
