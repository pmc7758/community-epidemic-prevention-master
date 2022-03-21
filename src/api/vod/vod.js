import request from '@/utils/request'

export default{

    // 获取视频列表信息
    getVideoList(current, limit, VodQuery) {
        return request({
            url: `/pac/regionalVideo/videoListByCondition/${current}/${limit}`, // 接口地址
            method: 'post', // 提交方式
            data: VodQuery
        })
    },

    // 删除视频
    deleteVodById(id) {
        return request({
            url: `/pac/regionalVideo/deleteVodById/${id}`,
            method: 'delete'
        })
    },

    // 添加视频
    addVideo(vod) {
        return request({
            url: `/pac/regionalVideo/addRegionalVideo`, // 接口地址
            method: 'post', // 提交方式
            data: vod // 用data表示用json传递，后端（@RequestBody）才能接收
        })
    },

    // 查询单个视频信息
    getVideoInfo(id) {
        return request({
            url: `/pac/regionalVideo/getVideoInfo/${id}`, // 接口地址
            method: 'get', // 提交方式
        })
    },

    // 删除阿里云上的视频
    deleteAliyunvod(id) {
        return request({
            url: `/vod/video/removeAlyVideo/${id}`, // 接口地址
            method: 'delete', // 提交方式
        })
    },

    // 根据视频id获取视频凭证
    getPlayAuth(vid) {
        return request({
          url: `/vod/video/getPlayAuth/${vid}`,
          method: 'get'
        })
    },


}