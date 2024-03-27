const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://sample.bmaster.kro.kr',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      }
    }
  }
})
