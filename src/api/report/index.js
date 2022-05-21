import request from '@/utils/request'

export default{

  // 创建一个方式去给前端调用获取数据
  getReportList(current, limit, regionalId) {
    return request({
      url: `/pac/regionalReport/getReportList/${current}/${limit}/${regionalId}`, // 接口地址
      method: 'get' // 提交方式
    })
  },

  // 删除核酸
  deleteReportById(id) {
    return request({
      url: `/pac/regionalReport/deleteReportById/${id}`,
      method: 'delete'
    })
  }

}
