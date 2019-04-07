const { override, addBabelPreset, addBabelPlugin } = require("customize-cra")

module.exports = override(
  addBabelPreset("@emotion/babel-preset-css-prop"),
  addBabelPlugin(["@babel/plugin-proposal-decorators", { legacy: true }])
)
