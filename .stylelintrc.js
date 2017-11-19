module.exports = {
  plugins: [
    'stylelint-scss'
  ],
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-sass-guidelines'
  ],
  rules: {
    'selector-no-qualifying-type': {
      ignore: ['attribute', 'class', 'id']
    },
    'color-named': null
  }
}
