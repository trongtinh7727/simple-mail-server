module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    port: 8080,
    proxy: {
      "/api": {
        target: "http://140.245.121.73:54321",
        pathRewrite: { "^/api": "" },
        changeOrigin: true
      }
    }
  }
};
