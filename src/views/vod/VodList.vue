<template>
  <div class="app-container">

    <!-- 条件查询 -->
    <el-form :inline="true" class="demo-form-inline">

      <el-form-item label="视频标题">
        <el-input v-model="vodQuery.title" placeholder="视频标题"/>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="vodQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-form-item label="截止时间">
        <el-date-picker
          v-model="vodQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getVodListByPage()">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- 视频播放弹窗 -->
    <el-dialog
      :visible.sync="dialogVisible"
      title="提示"
      width="70%">
      <palyer :vid = "vid"/>
    </el-dialog>

    <!-- 列表展示 -->
    <el-table
      :data="vodList"
      border
      fit
      style="width: 100%"
      highlight-current-row>

      <el-table-column prop="title" label="标题" width="180" align="center"/>

      <el-table-column prop="playCount" label="播放次数" align="center"/>

      <el-table-column prop="duration" label="视频时长" align="center"/>

      <el-table-column prop="createTime" label="上传日期" align="center"/>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="dialogVisible = true"
          >预览</el-button>
          <router-link :to="'/vod/edit/' + scope.row.id">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
            >修改</el-button>
          </router-link>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="deleteVodById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <!-- 分页 -->
    <el-pagination
      :total="total"
      :page-size="limit"
      :current-page="current"
      background
      layout="total, prev, pager, next"
      style="padding: 30px 0; text-aling: center"
      @current-change="getVodListByPage"/>
  </div>
</template>

<script>
import vodApi from '@/api/vod/vod'
import palyer from '../player/_vid.vue'

export default {

  components: {
    'palyer': palyer
  },
  data() { // 定义变量和初始值
    return {
      vid: 'd85de79f99fe4aebb865f1d7f4ce877c',
      dialogVisible: false,
      vodList: null,
      total: 0, // 总记录数
      current: 1, // 当前页
      limit: 10, // 每页数据个数
      vodQuery: {
        title: '',
        begin: '',
        end: ''
      }
    }
  },

  created() { // 页面渲染之前执行， 调用methods定义的方法
    this.getVodListByPage()
  },

  methods: { // 创建具体的方法，调用api里面的方法

    // 条件查询列表
    getVodListByPage(current = 1) {
      this.current = current
      vodApi.getVideoList(this.current, this.limit, this.vodQuery)
        .then(response => { // 成功后数据赋值给页面初始值
          this.vodList = response.data.records
          this.total = response.data.total
        })
        .catch(error => { // 失败
          console.log(error)
        })
    },

    // 删除视频
    deleteVodById(id) {
      this.$confirm('此操作将永久删除该视频信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        vodApi.deleteVodById(id)
          .then(response => { // 成功
            // 提示信息
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 刷新
            this.getVodListByPage()
          })
      })
    }

  }
}
</script>
