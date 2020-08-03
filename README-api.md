## 1. 分析网站的接口是干什么的？

首页轮播图数据：
GET：https://mhd.zhuishushenqi.com/comic_v2/getproad?apptype=8&appversion=1.0&channel=web-app&adgroupid=123

首页漫画推荐数据：
GET：https://mhd.zhuishushenqi.com/comic_v2/customerview?apptype=8&appversion=1.0&channel=web-app&viewtype=1


## 2. 去请求一下看看是会跨域
不跨越的好说，直接用就好了。
跨域的如何处理呢？

1. jsonp
2. cors
3. 代理 (推荐)
4. ....

#### 代理的处理
##### 方案一：自己做一个nodejs的中间层

> 创建一个server.js

```bash
npm i express http-proxy-middleware -D
```

A - 当前页面地址： http://localhost:8080

B - nodejs中间层：http://localhost:9090

C - 目标地址      http://movie.miguvideo.com

D - 目标地址的某个接口地址   http://movie.miguvideo.com/lovev/miguMovie/data/seeFilmData.jsp

```javascript
//引入express
const express = require("express");
const cors = require("cors");
const {createProxyMiddleware} = require("http-proxy-middleware");

//express 实例
const app = express();

// app.use((req, res, next) => {
//   res.set({
//     'Access-Control-Allow-Origin': '*'
//   })
// })
app.use(cors()); //处理跨域问题

//设置代理，设置一个统一的代理
//目标接口地址是： http://movie.miguvideo.com/lovev/miguMovie/data/seeFilmData.jsp
//这是可以访问： http://localhost:9090/migu/lovev/miguMovie/data/seeFilmData.jsp

/*
  什么时候要配置 pathRewrite
  1. 目标接口地址： http://movie.miguvideo.com/lovev/miguMovie/data/seeFilmData.jsp
  2. 使用代理地址去请求： http://localhost:9090/migu//lovev/miguMovie/data/seeFilmData.jsp
  3. 代理处理之后真正的请求地址是： http://movie.miguvideo.com/migu//lovev/miguMovie/data/seeFilmData.jsp
  其中要将/migu 去掉，通过路径重写去除
*/
app.use("/migu", createProxyMiddleware({
  //目标地址
  target: 'http://movie.miguvideo.com',
  changeOrigin: true,
  pathRewrite: {
    '^/migu': ''
  }
}))

app.get("/", (req, res) => {
  res.send("hello world");
})

app.listen(9090, () => {
  console.log("服务启动成功：http://localhost:9090");
});
```

##### 方案二：配置vue脚手架的配置文件

> Vue 脚手架创建的项目，在本地开发的时候（npm run serve）时，启动的服务就是一个node实现的。
>
> Vue 脚手架创建的项目，有一个配置文件叫做 vue.config.js
>
> 在这个配置文件中可以做很多配置，其中就有代理的配置。

1. 项目根目录下创建一个vue.config.js
2. 配置vue.config.js 中devServer.proxy 配置，这里的配置与方案一的配置项是一样的。
3. 重新运行项目
4. A 与 B 是同一个主机。这里就是 localhost:8080

[Vue-cli 参考文档](https://cli.vuejs.org/zh/config/#devserver)

```javascript
//vue.config.js
// 项目的配置文件
module.exports = {
  devServer: {
    proxy: {
      // key: value
      // key 是前缀
      // value 是跟 http-proxy-middleware 相同的一个配置
      '/migu': {
        // 目标地址
        target: 'http://movie.miguvideo.com',
        changeOrigin: true,
        pathRewrite: {
          '^/migu': ''
        }
      },
      '/api': {
        target: 'https://mhd.zhuishushenqi.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
```

## 3. 接口统一处理

### <1> 确定网络请求工具选择什么？

> axios

### <2>安装axios

```bash
$ npm install axios -D
```

### <3> 对axios 做一个二次封装 [axios文档](https://www.kancloud.cn/yunye/axios/234845)

> 创建 src/utils/request.js

#### <4> 创建src/api 文件夹

> 将要调用的接口按照模块去拆分成一个一个的js文件，然后统一放置在 src/api 目录下

