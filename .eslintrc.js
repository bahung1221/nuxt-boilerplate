module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 6,
  },
  extends: [
    'plugin:vue/strongly-recommended',
    'standard'
  ],
  plugins: [
    'vue'
  ],
  globals: {
    $: true,
    jQuery: true,
    API_URL: true,
    SURFACE_URL: true,
    dayjs: true,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/html-self-closing': ['error', {
      'html': {
        'void': 'always',
        'normal': 'never',
      },
    }],
    'one-var': ['error', { var: 'always', let: 'consecutive', const: 'never' }],
    'comma-dangle': ['error', 'always-multiline'],
    'space-before-function-paren': 'off',
    'vue/html-self-closing': 'off',
    'vue/singleline-html-element-content-newline': 'off',
  }
}
