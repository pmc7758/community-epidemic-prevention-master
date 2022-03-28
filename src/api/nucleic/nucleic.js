import request from '@/utils/request'

export default{

  // 创建一个方式去给前端调用获取数据
  getNucleicTestList(current, limit, NucleicTestQuery) {
    return request({
      url: `/pac/nucleicTest/getTestListByCond/${current}/${limit}`, // 接口地址
      method: 'post', // 提交方式
      data: NucleicTestQuery // 用data表示用json传递，后端（@RequestBody）才能接收
    })
  },

  // 删除讲师
  deleteMemberById(id) {
    return request({
      url: `/pac/member/deleteMemberById/${id}`,
      method: 'delete'
    })
  }

}
