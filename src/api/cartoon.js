// 专门处理 漫画相关的 接口请求
// 引入封装好的 axios 的实例
import request from '@/utils/request'
/*
  获取轮播图
*/
export const getBanner = () => {
  // return 的 接口调用之后的，axios返回的 promise对象
  return request({
    url: '/api/comic_v2/getproad',
    methods: 'GET',
    // 需要请求体参数，就提供 data
    // 需要查询字符串参数，就提供params
    params: {
      apptype: 8,
      appversion: '1.0',
      channel: 'web-app',
      adgroupid: 123
    }
  })
}

export const getIndexRecomment = () => {
  // 获取首页的推荐数据
  return request({
    url: '/api/comic_v2/customerview',
    methods: 'GET',
    params: {
      apptype: 8,
      appversion: '1.0',
      channel: 'web-app',
      viewtype: 1
    }
  })
}
