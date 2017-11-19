module.exports = {
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: ['standard', 'plugin:flowtype/recommended'],
  parser: 'babel-eslint',
  plugins: ['flowtype', 'html'],
  root: true,
  parserOptions: {
    sourceType: 'module'
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
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
