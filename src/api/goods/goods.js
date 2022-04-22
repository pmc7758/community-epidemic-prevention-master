import request from '@/utils/request'

export default{

  // 添加货物
  addgoods(goods) {
    return request({
      url: `/whouse/commodity/addCommodity`, // 接口地址
      method: 'post', // 提交方式
      data: goods // 用data表示用json传递，后端（@RequestBody）才能接收
    })
  },

  // 上传图片到服务器保存，并返回url
  uploadOssFile(file) {
    return request({
      url: `/oss/getOssFile`, // 接口地址
      method: 'post', // 提交方式
      data: file // 用data表示用json传递，后端（@RequestBody）才能接收
    })
  },

  // 创建一个方式去给前端调用获取数据
  getGoodsList(current, limit, Query) {
    return request({
      url: `/whouse/commodity/getCommodityList//${current}/${limit}`, // 接口地址
      method: 'post', // 提交方式
      data: Query // 用data表示用json传递，后端（@RequestBody）才能接收
    })
  },

  // 查询单个货物信息
  getGoodsInfo(id) {
    return request({
      url: `/whouse/commodity/getGoodsInfoById/${id}`, // 接口地址
      method: 'get' // 提交方式
    })
  },

  // 删除一个货物信息
  deleteGoodsById(id) {
    return request({
      url: `/whouse/commodity/deleteGoodsById/${id}`,
      method: 'delete'
    })
  },

  // 创建一个方式去给前端调用获取数据
  getOrderListByPage(current, limit, orderQuery) {
    return request({
      url: `/whouse/order/getOrderListByPage/${current}/${limit}`, // 接口地址
      method: 'post', // 提交方式
      data: orderQuery // 用data表示用json传递，后端（@RequestBody）才能接收
    })
  },

  updateOrderStatus(orderId, status) {
    return request({
      url: `/whouse/order/updateOrderStatus//${orderId}/${status}`, // 接口地址
      method: 'GET'
    })
  }

}
