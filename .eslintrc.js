const OFF = 0
const WARN = 1
const ERROR = 2
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
    'arrow-parens': OFF,
    // allow async-await
    'generator-star-spacing': OFF,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? ERROR : OFF,
    'import/no-unresolved': OFF,
    'import/no-unassigned-import': OFF,
    "vue/html-no-self-closing": "error",
    semi: ['error', 'never'],
    "no-console": "off",
    'accessor-pairs': OFF,
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
