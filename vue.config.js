module.exports = {
  publicPath:'./',
  assetsDir: './',
    devServer: {
        proxy: {
            '/api': {
              target: 'http://localhost:5000/',
              ws: true,
              changeOrigin: true
            },
            '/uploads': {
              target: 'http://localhost:5000/',
              ws: true,
              changeOrigin: true
            },
      }
  },
  
}