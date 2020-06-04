const path = require("path");
module.exports = {
  outputDir: path.resolve(__dirname, "../Sentences/www"),
  publicPath: "./",
  assetsDir: "./",
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:5000/",
        ws: true,
        changeOrigin: true,
      },
      "/uploads": {
        target: "http://localhost:5000/",
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
