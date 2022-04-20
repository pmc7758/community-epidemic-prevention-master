import request from '@/utils/request'

export default{

  // 注册
  registerAdmin(adminRegister) {
    return request({
      url: '/admin/acl/index/registerAdmin',
      method: 'post',
      data: adminRegister
    })
  }

}
