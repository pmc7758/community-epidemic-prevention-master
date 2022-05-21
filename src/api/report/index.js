import request from '@/utils/request'
import qs from 'qs'

export default{

  // 创建一个方式去给前端调用获取数据
  getReportList(current, limit, regionalId) {
    return request({
      url: `/pac/regionalReport/getReportList/${current}/${limit}/${regionalId}`, // 接口地址
      method: 'get' // 提交方式
    })
  },

  // 删除风险名单
  deleteReportById(id) {
    return request({
      url: `/pac/regionalReport/deleteReportById/${id}`,
      method: 'delete'
    })
  },

  // 邮件通知
  sendEmailForInfo(email, information) {
    return request({
      url: `/email/information`,
      method: 'post',
      data: qs.stringify({
        email: email,
        information: information
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

}
