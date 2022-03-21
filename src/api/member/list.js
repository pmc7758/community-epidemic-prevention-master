import request from '@/utils/request'

export default{

    // 创建一个方式去给前端调用获取数据
    getMemberList(current, limit, memberQuery) {
        return request({
            url: `/pac/member/getMemberListByPage/${current}/${limit}`, // 接口地址
            method: 'post', // 提交方式
            data: memberQuery // 用data表示用json传递，后端（@RequestBody）才能接收
        })
    },

    // 删除讲师
    deleteMemberById(id) {
        return request({
            url: `/pac/member/deleteMemberById/${id}`,
            method: 'delete'
        })
    },

    // 添加讲师
    addMember(member) {
        return request({
            url: `/pac/member/addMember`, // 接口地址
            method: 'post', // 提交方式
            data: member // 用data表示用json传递，后端（@RequestBody）才能接收
        })
    },

    // 查询单个社员信息
    getMemberInfo(id) {
        return request({
            url: `/pac/member/getMemberInfo/${id}`, // 接口地址
            method: 'get', // 提交方式
        })
    },

}