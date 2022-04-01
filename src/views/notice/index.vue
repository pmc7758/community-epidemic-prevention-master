<template>
  <div class="block app-container">
    <!-- 条件查询 -->
    <el-form ref="notice-form" :inline="false" :model="notice" :rules="noticeRules" class="demo-form-inline">
      <el-form-item label="公告内容" prop="notice">
        <el-input v-model="notice.notice" placeholder="公告内容"/>
      </el-form-item>

      <el-form-item>
        <el-button v-if="show" type="primary" icon="el-icon-position" @click="saveOrUpdateNotice()">发布公告</el-button>
        <el-button v-if="!show" type="primary" icon="el-icon-position" @click="saveOrUpdateNotice()">修改公告</el-button>
      </el-form-item>
    </el-form>
    <el-timeline :reverse="reverse">
      <el-timeline-item
        v-for="(notices, id) in noticeList"
        :key="id"
        :timestamp="notices.createTime"
        placement="top">
        <el-card>
          <h4>{{ notices.notice }}</h4>
          <el-button style="float: right;margin-bottom: 5px; padding: 8px 5px" icon="el-icon-delete" type="danger" size="normall" @click="deleteNoticeById(notices.id)">删除</el-button>
          <router-link :to="'/notice/edit/' + notices.id">
            <el-button style="float: right;margin-bottom: 5px; margin-right: 8px; padding: 8px 5px" icon="el-icon-edit" type="primary" size="normall">修改</el-button>
          </router-link>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import noticeAPI from '@/api/notice/index'

export default {
  data() {
    return {
      show: true,
      reverse: true,
      noticeList: null,
      notice: {
        id: '',
        regionalId: '1461218798756454402',
        notice: ''
      },
      noticeRules: { notice: [{ required: true, trigger: 'blur', message: '公告不能为空' },
        { max: 200, message: '长度在 200 个字符之内', trigger: 'blur' }] }
    }
  },

  watch: {
    '$route'(val, from) { // 监听到路由（参数）改变
      // 拿到目标参数 val.query.typeCode 去再次请求数据接口
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.getNoticeByid(id)
      } else {
        this.notice.id = ''
      }
    }
  },

  created() {
    this.getNoticeList()
  },

  methods: {
    getNoticeList() {
      noticeAPI.selectNoticeList(this.notice.regionalId)
        .then(response => {
          this.noticeList = response.data
        })
    },

    saveOrUpdateNotice() {
      this.$refs['notice-form'].validate((valid) => {
        if (valid) {
          noticeAPI.addOrUpdateNotice(this.notice)
            .then(response => {
              this.$message({
                type: 'success',
                message: '发布成功!'
              })
              this.notice.notice = ''
              this.getNoticeList()
            })
        } else {
          return false
        }
      })
      this.show = true
      this.$router.push('/notice/table')
    },

    deleteNoticeById(id) {
      this.$confirm('此操作将永久删除该公告信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        noticeAPI.deleteNoticeById(id)
          .then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getNoticeList()
          })
      })
    },

    getNoticeByid(id) {
      noticeAPI.selectNoticeOne(id)
        .then(response => {
          this.notice.notice = response.data.notice
          this.notice.id = response.data.id
        })
      this.show = false
    }
  }
}
</script>

<style>

</style>
