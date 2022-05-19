<template>
  <div class="app-container">

    <!-- 条件查询 -->
    <el-form :model="nucleicQuery" :inline="true" class="demo-form-inline">
      <el-form-item prop="realName" label="姓名">
        <el-input v-model="nucleicQuery.realName" placeholder="社员姓名"/>
      </el-form-item>

      <el-form-item prop="agentTimes" label="剂次">
        <el-select v-model="nucleicQuery.nucleicCount" clearable placeholder="请选择">
          <el-option
            v-for="num in agentTimes"
            :key="num.value"
            :label="num.label"
            :value="num.value"/>
        </el-select>
      </el-form-item>

      <el-form-item label="毒株类型">
        <el-select v-model="nucleicQuery.nucleicType" clearable placeholder="请选择">
          <el-option
            v-for="item in types"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </el-form-item>

      <el-form-item label="检测时间">
        <el-date-picker
          v-model="nucleicQuery.begin"
          type="date"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getNucleicTestList()">查询</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getNucleicTestList()">查询感染人员</el-button>
      </el-form-item>

      <el-form-item>
        <el-upload
          ref="uploadFile"
          :limit="1"
          :on-success="handleSuccess"
          :action="BASE_API + '/pac/nucleicTest/saveBatchNT/'"
          class="upload-demo"
          multiple>
          <el-button type="primary">点击上传核酸检测结果文件<i class="el-icon-upload el-icon--right"/></el-button>
          <el-tooltip placement="right-end">
            <div slot="content">
              只能上传模块文件
            </div>
            <i class="el-icon-question"/>
          </el-tooltip>
        </el-upload>
      </el-form-item>

    </el-form>

    <!-- 表格显示 -->
    <el-table
      :data="nucleicList"
      border
      fit
      style="width: 100%"
      highlight-current-row>

      <el-table-column prop="realName" label="姓名" width="180" align="center"/>

      <el-table-column prop="address" label="地址" align="center"/>

      <el-table-column prop="nucleicCount" label="检测剂次" align="center"/>

      <el-table-column prop="detectionTime" label="检测时间" align="center"/>

      <el-table-column prop="status" label="感染状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? '阳性' : '阴性' }}
        </template>
      </el-table-column>

      <el-table-column prop="nucleicType" label="毒株类型" align="center">
        <template slot-scope="scope">
          {{ selectType(scope.row.nucleicType) }}
        </template>
      </el-table-column>

      <el-table-column label="检测凭证" width="180" align="center">
        <template slot-scope="scope">
          <el-image :src="scope.row.voucher" style="width: 70px; height: 70px"/>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="deleteNTById(scope.row.id)">删除</el-button>
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
      @current-change="getNucleicTestList"/>
  </div>
</template>

<script>
import nucleicAPI from '@/api/nucleic/nucleic'

export default {
  data() { // 定义变量和初始值
    return {
      BASE_API: process.env.BASE_API, // 接口API地址,localhost:8222这个地址
      nucleicList: null,
      total: 0, // 总记录数
      current: 1, // 当前页
      limit: 10, // 每页数据个数
      nucleicQuery: {
        realName: '',
        regionalId: this.$store.getters.regionalId,
        begin: '',
        nucleicCount: '',
        nucleicType: ''
      },

      agentTimes: [{
        value: '1',
        label: '第一次'
      }, {
        value: '2',
        label: '第二次'
      }, {
        value: '3',
        label: '第三次'
      }, {
        value: '4',
        label: '第四次'
      }, {
        value: '5',
        label: '第五次'
      }],
      types: [{
        value: '1',
        label: '阿尔法毒株'
      }, {
        value: '2',
        label: '贝塔毒株'
      }, {
        value: '3',
        label: '伽马变异株'
      }, {
        value: '4',
        label: '德尔塔毒株'
      }, {
        value: '5',
        label: '奥密克戎毒株'
      }, {
        value: '6',
        label: '混合型毒株'
      }]
    }
  },

  created() { // 页面渲染之前执行， 调用methods定义的方法
    this.getNucleicTestList()
  },

  methods: { // 创建具体的方法，调用api里面的方法

    // 条件查询列表
    getNucleicTestList(current = 1) {
      this.current = current
      nucleicAPI.getNucleicTestList(this.current, this.limit, this.nucleicQuery)
        .then(response => { // 成功后数据赋值给页面初始值
          this.nucleicList = response.data.records
          this.total = response.data.total
          console.log(this.nucleicList)
        })
        .catch(error => { // 失败
          console.log(error)
        })
    },

    selectType(index) {
      switch (index) {
        case '1':
          return '阿尔法毒株'
        case '2':
          return '贝塔毒株'
        case '3':
          return '伽马变异株'
        case '4':
          return '德尔塔毒株'
        case '5':
          return '奥密克戎毒株'
        case '6':
          return '混合型毒株'
        default:
          return '未感染'
      }
    },

    // 批量导入
    handleSuccess() {
      this.$refs.uploadFile.clearFiles()
      this.$message({
        type: 'success',
        message: '批量导入成功!'
      })
      // 刷新
      this.getNucleicTestList()
    },

    deleteNTById(id) {
      this.$confirm('此操作将永久删除该核酸检测结果信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        nucleicAPI.deleteNTById(id)
          .then(response => { // 成功
            // 提示信息
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 刷新
            this.getNucleicTestList()
          })
      })
    }

  }
}
</script>
