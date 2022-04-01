import request from '@/utils/request'

export default{

  // 获取视频列表信息
  getVacListByPage(current, limit, vacQuery) {
    return request({
      url: `/pac/vaccines/getVacListInfoByPage/${current}/${limit}`, // 接口地址
      method: 'post', // 提交方式
      data: vacQuery
    })
  }

}
