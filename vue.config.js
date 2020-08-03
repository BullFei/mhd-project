//项目的配置文件
module.exports = {
  devServer: {
    proxy: {
      //key: value
      // key 是前缀
      // value 是跟 http-proxy-middleware 相同的一个配置
      '/migu': {
        //目标地址
        target: 'http://movie.miguvideo.com',
        changeOrigin: true,
        pathRewrite: {
          '^/migu': ''
        }
      }
    }
  }
}
