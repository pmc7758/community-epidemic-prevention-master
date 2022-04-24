import request from '@/utils/request'

export default{

  // 获取患病人数和总人数
  getPrevalenceRatio(regionalId) {
    return request({
      url: `/statistics/sta/getPrevalenceRatio/${regionalId}`, // 接口地址
      method: 'get' // 提交方式
    })
  },

  //
  getProportionOfStrains(regionalId) {
    return request({
      url: `/statistics/sta/getProportionOfStrains/${regionalId}`, // 接口地址
      method: 'get' // 提交方式
    })
  },

  //
  getVaccinationEachTime(regionalId) {
    return request({
      url: `/statistics/sta/getVaccinationEachTime/${regionalId}`, // 接口地址
      method: 'get' // 提交方式
    })
  },

  getVaccinationStatistics(regionalId) {
    return request({
      url: `/statistics/sta/getVaccinationStatistics/${regionalId}`, // 接口地址
      method: 'get' // 提交方式
    })
  }

}
