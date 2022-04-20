import request from '@/utils/request'

export default{

  // 获取区域信息
  getRegional(id) {
    return request({
      url: `/pac/regionalInfo/getRegionalInfo/${id}`, // 接口地址
      method: 'get' // 提交方式
    })
  },

  addRegional(regionalInfo) {
    return request({
      url: '/pac/regionalInfo/addRegional', // 接口地址
      method: 'POST', // 提交方式
      data: regionalInfo
    })
  }

}
