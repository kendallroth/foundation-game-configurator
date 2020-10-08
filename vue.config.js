// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

const src = path.resolve(__dirname, "src");

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@assets": path.join(src, "./assets"),
        "@components": path.join(src, "./components"),
        "@data": path.join(src, "./data"),
        "@config": path.join(src, "./config"),
        "@models": path.join(src, "./types/models"),
        "@plugins": path.join(src, "./plugins"),
        "@services": path.join(src, "./services"),
        "@store": path.join(src, "./store"),
        "@styles": path.join(src, "./styles"),
        "@storage": path.join(src, "./storage"),
        "@typings": path.join(src, "./types"),
        "@utilities": path.join(src, "./utilities"),
        "@views": path.join(src, "./views"),
      },
    },
  },

  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: "com.kendallroth.foundation-configurator",
        copyright: "Copyright © 2020 Kendall Roth",
        productName: "Foundation Configurator",
      },
      nodeIntegration: true,
    },
  },

  transpileDependencies: ["vuetify"],
};
