module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:54321",
        pathRewrite: { "^/api": "" },
        changeOrigin: true
      }
    }
  }
};
