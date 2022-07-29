const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: "/",
  filenameHashing: true,
  productionSourceMap: false,
  transpileDependencies: true,
});
