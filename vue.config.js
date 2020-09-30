// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

const src = path.resolve(__dirname, "src");

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@assets": path.join(src, "./assets"),
        "@components": path.join(src, "./components"),
        "@config": path.join(src, "./config"),
        "@plugins": path.join(src, "./plugins"),
        "@store": path.join(src, "./store"),
        "@styles": path.join(src, "./styles"),
        "@utilities": path.join(src, "./utilities"),
        "@views": path.join(src, "./views"),
      },
    },
  },

  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
    },
  },

  transpileDependencies: ["vuetify"],
};
