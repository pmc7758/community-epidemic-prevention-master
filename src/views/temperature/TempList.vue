<template>
  <div class="app-container">

    <!-- 条件查询 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="tempQuery.realName" placeholder="社员姓名"/>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="tempQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-form-item label="截止时间">
        <el-date-picker
          v-model="tempQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="getTemplListByPage()">查询</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="getTemplListByT()">查询体温超过37°C的社员</el-button>
      </el-form-item>

    </el-form>

    <el-table
      :data="infoList"
      border
      fit
      style="width: 100%"
      highlight-current-row>

      <el-table-column prop="realName" label="姓名" width="180" align="center"/>

      <el-table-column prop="age" label="年龄" align="center" width="80"/>

      <el-table-column prop="temperature" label="体温" width="80" align="center"/>

      <el-table-column prop="createTime" label="上传日期" width="170" align="center"/>

      <el-table-column prop="area" label="目前所在地" align="center"/>

      <el-table-column prop="area" label="准备去往地" align="center"/>

    </el-table>

    <!-- 分页 -->
    <el-pagination
      :total="total"
      :page-size="limit"
      :current-page="current"
      background
      layout="total, prev, pager, next"
      style="padding: 30px 0; text-aling: center"
      @current-change="getTemplListByPage"/>
  </div>
</template>

<script>
import tempApi from '@/api/temperature/temp'

export default {
  data() { // 定义变量和初始值
    return {
      infoList: null,
      total: 0, // 总记录数
      current: 1, // 当前页
      limit: 10, // 每页数据个数
      tempQuery: {
        regionalId: '1461218798756454402',
        realName: '',
        temperature: '',
        begin: '',
        end: ''
      }
    }
  },

  created() {
    this.getTemplListByPage()
  },

  methods: { // 创建具体的方法，调用api里面的方法
    // 条件查询列表
    getTemplListByPage(current = 1) {
      this.current = current
      tempApi.getTemplList(this.current, this.limit, this.tempQuery)
        .then(response => { // 成功后数据赋值给页面初始值
          this.infoList = response.data.records
          this.total = response.data.total
          console.log(this.total)
          console.log(this.infoList)
        })
        .catch(error => { // 失败
          console.log(error)
        })
    },

    // 条件查询列表
    getTemplListByT(current = 1) {
      this.current = current
      this.tempQuery.temperature = '37'
      tempApi.getTemplList(this.current, this.limit, this.tempQuery)
        .then(response => { // 成功后数据赋值给页面初始值
          this.infoList = response.data.records
          this.total = response.data.total
          console.log(this.infoList)
        })
        .catch(error => { // 失败
          console.log(error)
        })
    }

  }
}
</script>
