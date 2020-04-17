const base = require('./index')

module.exports = {
  ...base,
  root: true,
  parserOptions: { ...base.parserOptions, sourceType: 'script' },
  env: { ...base.env, node: true }
}
