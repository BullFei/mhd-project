// 专门处理 漫画相关的 接口请求
// 引入封装好的 axios 的实例
import request from '@/utils/request'
import { format } from '../utils/apiHeader'
/*
  获取轮播图
*/
export const getBanner = () => {
  // return 的 接口调用之后的，axios返回的 promise对象
  return request({
    url: '/api/comic_v2/getproad',
    method: 'GET',
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
    method: 'GET',
    params: {
      apptype: 8,
      appversion: '1.0',
      channel: 'web-app',
      viewtype: 1
    }
  })
}

// 获取分类类型
export const getproad = () => {
  // https://mhd.zhuishushenqi.com/comic_v2/getproad?apptype=8&appversion=1.0&channel=web-app&adgroupid=125
  // 获取首页的推荐数据
  return request({
    url: '/api/comic_v2/getproad',
    method: 'GET',
    params: {
      apptype: 8,
      appversion: '1.0',
      channel: 'web-app',
      adgroupid: 125
    }
  })
}

// https://mhd.zhuishushenqi.com/comic_v2/comicsfilterlist_v2?apptype=8&appversion=1.0&channel=web-app
// 获取分类数据

export const getTypeList = (subject, pagenp = 1, pagesize = 20) => {
  // 获取首页的推荐数据
  return request({
    url: '/api/comic_v2/comicsfilterlist_v2',
    method: 'POST',
    params: {
      apptype: 8,
      appversion: '1.0',
      channel: 'web-app'
    },
    data: format({
      subject,
      pagenp,
      pagesize
    })
  })
}

// 获取排行榜数据
export const getRankList = (ranktype, pageno = 1, pagesize = 20) => {
  return request({
    url: '/api/comic_v2/comicsrank',
    method: 'POST',
    params: {
      apptype: 8,
      appversion: '1.0',
      channel: 'web-app'
    },
    data: format({
      ranktype,
      pageno,
      pagesize
    })
  })
}

export const getVIPList = () => {
  return request({
    url: '/api/comic_v2/comicsfilterlist_v2',
    method: 'POST',
    params: {
      apptype: 8,
      appversion: '1.0',
      channel: 'web-app'
    },
    data: format({
      special: 892,
      pageno: 1,
      pagesize: 20
    })
  })
}

// 热门搜索数据
// https://mhd.zhuishushenqi.com/comic/hotsearch?apptype=8&appversion=1.0&channel=web-app&appType=8
export const getHotSearch = () => {
  return request({
    url: '/api/comic/hotsearch',
    method: 'GET',
    params: {
      apptype: 8,
      appversion: '1.0',
      channel: 'web-app'
    }
  })
}

// 搜索关键字操作
// https://mhd.zhuishushenqi.com/comic_v2/searchindex?apptype=8&appversion=1.0&channel=web-app&name=1&type=2
export const searchIndex = (value) => {
  return request({
    url: '/api/comic_v2/searchindex',
    method: 'GET',
    params: {
      apptype: 8,
      appversion: '1.0',
      channel: 'web-app',
      name: value,
      type: 2
    }
  })
}
