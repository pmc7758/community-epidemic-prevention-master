import request from '@/utils/request'

export default{

  // 删除公告
  deleteNoticeById(id) {
    return request({
      url: `/pac/regionalNotice/deleteNotice/${id}`,
      method: 'delete'
    })
  },

  // 添加或修改公告
  addOrUpdateNotice(notice) {
    return request({
      url: `/pac/regionalNotice/saveNotice`, // 接口地址
      method: 'post', // 提交方式
      data: notice // 用data表示用json传递，后端（@RequestBody）才能接收
    })
  },

  // 查询公告
  selectNoticeList(regionalId) {
    return request({
      url: `/pac/regionalNotice/getNoticeList/${regionalId}`, // 接口地址
      method: 'get' // 提交方式
    })
  },

  // 查询公告
  selectNoticeOne(id) {
    return request({
      url: `/pac/regionalNotice/getNoticeById/${id}`, // 接口地址
      method: 'get' // 提交方式
    })
  }

}
