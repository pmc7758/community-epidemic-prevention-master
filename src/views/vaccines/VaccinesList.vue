<template>
  <div class="app-container">
    <!-- 条件查询 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="vacQuery.realName" placeholder="社员姓名"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getVaccinesListByPage()">查询</el-button>
      </el-form-item>

      <el-form-item>
        <el-input-number v-model="num" :min="1" :max="50" label="接种剂次"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getVaccinesListByNum()">查询未接种第 {{ num }} 剂次的社员</el-button>
      </el-form-item>

    </el-form>

    <!-- 信息展示 -->
    <el-table
      :data="vaccinesList"
      border
      fit
      style="width: 100%"
      highlight-current-row>

      <el-table-column prop="realName" label="姓名" width="180" align="center"/>

      <el-table-column prop="vaccinesName" label="疫苗名称" align="center" width="80"/>

      <el-table-column prop="manufacturer" label="厂商名称" width="120" align="center"/>

      <el-table-column prop="agentTimes" label="剂次" width="170" align="center"/>

      <el-table-column prop="vaccinationUnit" label="接种单位" align="center"/>

      <el-table-column prop="vaccinationTime" label="接种时间" align="center"/>

      <el-table-column label="凭证图" width="180" align="center">
        <template slot-scope="scope">
          <el-image :src="scope.row.image" style="width: 70px; height: 70px"/>
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
      @current-change="getVaccinesListByPage()"/>
  </div>
</template>

<script>
import vacAPI from '@/api/vaccines/vaccines'

export default {
  data() {
    return {
      vaccinesList: null,
      total: 0, // 总记录数
      current: 1, // 当前页
      limit: 10, // 每页数据个数
      vacQuery: {
        regionalId: '1461218798756454402',
        realName: '',
        num: ''
      },
      num: '1'
    }
  },
  created() {
    this.getVaccinesListByPage()
  },
  methods: {
    getVaccinesListByNum() {
      this.vacQuery.num = this.num
      this.getVaccinesListByPage()
    },

    getVaccinesListByPage(current = 1) {
      this.current = current
      vacAPI.getVacListByPage(this.current, this.limit, this.vacQuery)
        .then(response => { // 成功后数据赋值给页面初始值
          this.vaccinesList = response.data.records
          this.total = response.data.total
          this.vacQuery.num = ''
        })
    }
  }
}
</script>

<style>

</style>
