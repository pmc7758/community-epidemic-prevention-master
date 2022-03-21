<template>
    <div class="app-container">
        <el-form label-width="80px">
            <el-form-item label="视频标题">
                <el-input v-model="vod.title"></el-input>
            </el-form-item>

            <el-form-item>
                <el-upload
                    :on-success="handleVodUploadSuccess"
                    :on-remove="handleVodRemove"
                    :on-exceed="handleUploadExceed"
                    :before-remove="beforeVodRemove"
                    :file-list="fileList"
                    :action="BASE_API + '/vod/video/uploadAlyiVideo'"
                    :limit="1"
                    class="upload-demo">
                    <el-button size="small" type="primary">上传视频</el-button>
                    <el-tooltip placement="right-end">
                    <div slot="content">最大支持1G，<br>
                        支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br>
                        GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br>
                        MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br>
                        SWF、TS、VOB、WMV、WEBM 等视频格式上传</div>
                        <i class="el-icon-question"/>
                    </el-tooltip>
                </el-upload>
            </el-form-item>

            <el-form-item>
                <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdateVideo">立即发布</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import vodApi from '@/api/vod/vod'

export default {
    data() {
        return {
            vod: {
                title:'',
                videoSourceId:'',
                videoOriginalName:''
            },
            saveBtnDisabled:false,
            fileList: [], // 上传文件列表
            BASE_API: process.env.BASE_API // 接口API地址,localhost:8222这个地址
        }
    },

    created() {
        if (this.$route.params && this.$route.params.id) {
            const id = this.$route.params.id
            this.getVideoInfo(id)
        }
    },

    methods: {

        // 上传视频成功后拿到视频id
        handleVodUploadSuccess(response, file, fileList){
            this.vod.videoSourceId = response.data
            console.log(this.vod.videoSourceId)
            this.vod.videoOriginalName = file.name
        },

        // 上传之前调用的方法
        handleUploadExceed() {
            this.$message.warning('想要重新上传视频,请先删除已上传的视频')
        },

        // 保存视频信息
        saveOrUpdateVideo() {
            vodApi.addVideo(this.vod)
                .then(response => {
                    // 提示信息
                    this.$message({
                    type: 'success',
                    message: '添加成功!'
                    });
                    // 回到列表页 路由跳转
                    this.$router.push({path:'/video/table'})
                })
        },

        getVideoInfo(id) {
            vodApi.getVideoInfo(id)
                .then(respones => {
                    this.vod = respones.data
                })
        },

        // 点击×调用这个方法弹出提示
        beforeVodRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },

        // 点击确定删除调用的方法
        handleVodRemove() {
            // 调用接口的删除视频的方法
            vodApi.deleteAliyunvod(this.vod.videoSourceId)
                .then(response =>{
                    //1，提示信息
                    this.$message({
                    type: 'success',
                    message: '删除视频成功!'
                });
                //把文件列表清空
                this.fileList = []
                //把video视频id和视频名称值清空
                this.vod.videoSourceId = ''
                this.vod.videoOriginalName = ''
                })
        },
    }
}
</script>