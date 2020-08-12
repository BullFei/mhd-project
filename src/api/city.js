// 专门处理 城市相关的 接口请求
// 注意，城市相关的接口是找 卖座网去借鉴过来的，不能去使用request.js
import axios from 'axios'

export const getCityList = () => {
  return axios({
    url: '/maizuo/gateway?k=4075731',
    method: 'GET',
    headers: {
      'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1597154744253317171118081"}',
      'X-Host': 'mall.film-ticket.city.list'
    }
  })
}
