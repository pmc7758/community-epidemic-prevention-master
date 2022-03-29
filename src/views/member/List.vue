<template>
  <div class="app-container">

    <!-- 条件查询 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="memberQuery.realName" placeholder="社员姓名"/>
      </el-form-item>

      <el-form-item label="电话号码">
        <el-input v-model="memberQuery.phone" placeholder="社员电话"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="getMemberListByPage()">查询</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary">
          <a href="@/../static/社员批量导入模块.xlsx" target="_blank" download="社员批量导入模块.xlsx">下载批量导入文件模板</a>
        </el-button>
      </el-form-item>

      <el-form-item>
        <el-upload
          ref="uploadFile"
          :limit="1"
          :on-success="handleSuccess"
          :action="BASE_API + '/pac/member/saveBatchMember/' + memberQuery.regionalId"
          class="upload-demo"
          multiple>
          <el-button type="primary">点击上传批量导入文件</el-button>
          <el-tooltip placement="right-end">
            <div slot="content">
              只能上传导入模块文件，请先下载模块文件
            </div>
            <i class="el-icon-question"/>
          </el-tooltip>
        </el-upload>
      </el-form-item>
    </el-form>

    <el-table
      :data="memberList"
      border
      fit
      style="width: 100%"
      highlight-current-row>

      <el-table-column prop="realName" label="姓名" width="180" align="center"/>

      <el-table-column label="性别" width="80" prop="sex" align="center">
        <template slot-scope="scope">
          {{ scope.row.sex === 2 ? '男' : '女' }}
        </template>
      </el-table-column>

      <el-table-column prop="age" label="年龄" width="80" align="center"/>

      <el-table-column prop="address" label="地址" align="center"/>

      <el-table-column prop="phone" label="电话" align="center"/>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <router-link :to="'/members/edit/' + scope.row.id">
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
            @click="deleteMemberById(scope.row.id)">删除</el-button>
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
      @current-change="getMemberListByPage"/>
  </div>
</template>

<script>
import member from '@/api/member/list'

export default {
  data() { // 定义变量和初始值
    return {
      BASE_API: process.env.BASE_API, // 接口API地址,localhost:8222这个地址
      memberList: null,
      total: 0, // 总记录数
      current: 1, // 当前页
      limit: 10, // 每页数据个数
      memberQuery: {
        phone: '',
        realName: '',
        regionalId: '1461218798756454402'
      }
    }
  },

  created() { // 页面渲染之前执行， 调用methods定义的方法
    this.getMemberListByPage()
  },

  methods: { // 创建具体的方法，调用api里面的方法

    // 条件查询列表
    getMemberListByPage(current = 1) {
      this.current = current
      member.getMemberList(this.current, this.limit, this.memberQuery)
        .then(response => { // 成功后数据赋值给页面初始值
          this.memberList = response.data.records
          this.total = response.data.total
        })
        .catch(error => { // 失败
          console.log(error)
        })
    },

    // 删除社员
    deleteMemberById(id) {
      this.$confirm('此操作将永久删除该社员信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        member.deleteMemberById(id)
          .then(response => { // 成功
            // 提示信息
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 刷新
            this.getMemberListByPage()
          })
      })
    },

    // 批量导入
    handleSuccess() {
      this.$refs.uploadFile.clearFiles()
      this.$message({
        type: 'success',
        message: '批量导入成功!'
      })
      // 刷新
      this.getMemberListByPage()
    }

  }
}
</script>
