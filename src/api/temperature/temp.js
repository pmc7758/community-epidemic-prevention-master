import request from '@/utils/request'

export default{

    // 获取视频列表信息
    getTemplList(current, limit, tempQuery) {
        return request({
            url: `/pac/temperatureInfo/getTemperatureInfoListByPage/${current}/${limit}`, // 接口地址
            method: 'post', // 提交方式
            data: tempQuery
        })
    },


}