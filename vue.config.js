const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: "/",
  filenameHashing: false,
  productionSourceMap: false,
  transpileDependencies: true,

  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/style/colors.scss";
        `,
      },
    },
  },
});
