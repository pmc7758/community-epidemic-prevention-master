<template>
  <div class="app-container">
    <el-table
      :data="reportList"
      border
      fit
      style="width: 100%"
      highlight-current-row>

      <el-table-column prop="name" label="姓名" width="180" align="center"/>

      <el-table-column prop="content" label="详细描述" align="center"/>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="warning"
            icon="el-icon-phone"
            @click="ReportByEmail(scope.row.email)">邮件通知</el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="deleteReportById(scope.row.id)">删除</el-button>
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
      @current-change="getReportListByPage"/>
  </div>
</template>

<script>
import reportAPI from '@/api/report/index'

export default {
  data() { // 定义变量和初始值
    return {
      reportList: null,
      total: 0, // 总记录数
      current: 1, // 当前页
      limit: 10 // 每页数据个数
    }
  },
  mounted() {
    this.getReportListByPage()
  },
  methods: {
    getReportListByPage(current = 1) {
      this.current = current
      reportAPI.getReportList(this.current, this.limit, this.$store.getters.regionalId)
        .then(response => {
          this.reportList = response.data.records
          this.total = response.data.total
        })
    },
    // 删除社员
    deleteReportById(id) {
      this.$confirm('此操作将永久删除该风险名单信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        reportAPI.deleteReportById(id)
          .then(response => { // 成功
            // 提示信息
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 刷新
            this.getReportListByPage()
          })
      })
    },
    ReportByEmail(email) {
      this.$prompt('请输入相关通知信息', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        reportAPI.sendEmailForInfo(email, value)
          .then(response => {
            this.$message({
              type: 'success',
              message: '信息邮件已发送'
            })
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    }
  }
}
</script>

<style>

</style>
