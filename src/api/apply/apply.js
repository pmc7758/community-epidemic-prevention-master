import request from '@/utils/request'

export default{

  // 创建一个方式去给前端调用获取数据
  getApplyListByPage(current, limit, applyQuery) {
    return request({
      url: `/pac/regionalApply/getApplyListByPage/${current}/${limit}`, // 接口地址
      method: 'post', // 提交方式
      data: applyQuery // 用data表示用json传递，后端（@RequestBody）才能接收
    })
  },

  updateApplyStatus(id, status) {
    return request({
      url: `/pac/regionalApply/updateApplyStatus/${id}/${status}`, // 接口地址
      method: 'GET' // 提交方式
    })
  }

}
