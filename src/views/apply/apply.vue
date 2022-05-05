<template>
  <div class="app-container">
    <!-- 条件查询 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="applyQuery.realName" placeholder="申请人姓名"/>
      </el-form-item>

      <el-form-item label="当前所在地">
        <el-input v-model="applyQuery.location" placeholder="当前所在地"/>
      </el-form-item>

      <el-form-item label="审核状态">
        <el-select v-model="applyQuery.status" clearable placeholder="请选择">
          <el-option
            v-for="num in status"
            :key="num.value"
            :label="num.label"
            :value="num.value"/>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getApplyListByPage()">查询</el-button>
      </el-form-item>

    </el-form>

    <!-- 信息展示 -->
    <el-table
      :data="applyList"
      border
      fit
      style="width: 100%"
      highlight-current-row>

      <el-table-column prop="realName" label="申请人" width="180" align="center"/>

      <el-table-column prop="phone" label="电话" align="center" width="80"/>

      <el-table-column prop="location" label="当前所在地" width="120" align="center"/>

      <el-table-column prop="vehicle" label="返程交通工具" width="170" align="center"/>

      <el-table-column prop="trainNumber" label="返程车次/车牌" align="center"/>

      <el-table-column prop="arrivalTime" label="预计到达时间" align="center"/>

      <el-table-column prop="status" label="审核状态" align="center">
        <template slot-scope="scope">
          {{ analysisData(scope.row.status) }}
        </template>
      </el-table-column>

      <el-table-column prop="stayRisk" label="返程途中没有在中高风险地区停留" align="center">
        <template slot-scope="scope">
          {{ scope.row.stayRisk === true ? '是' : '否' }}
        </template>
      </el-table-column>

      <el-table-column prop="createTime" label="申请时间" align="center"/>

      <el-table-column label="凭证图" width="180" align="center">
        <template slot-scope="scope">
          <el-image :src="scope.row.travelCard" style="width: 70px; height: 70px"/>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-delete"
            @click="updateApplyStatus(scope.row.id, 1)">通过</el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="updateApplyStatus(scope.row.id, 2)">驳回</el-button>
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
      @current-change="getApplyListByPage()"/>
  </div>
</template>

<script>
import applyAPI from '@/api/apply/apply'

export default {
  data() {
    return {
      applyList: null,
      total: 0, // 总记录数
      current: 1, // 当前页
      limit: 10, // 每页数据个数
      applyQuery: {
        regionalId: this.$store.getters.regionalId,
        realName: '',
        status: '',
        location: ''
      },
      status: [{
        value: '0',
        label: '未审核'
      }, {
        value: '1',
        label: '申请通过'
      }, {
        value: '2',
        label: '申请未通过'
      }]
    }
  },
  created() {
    this.getApplyListByPage()
  },
  methods: {

    getApplyListByPage(current = 1) {
      this.current = current
      applyAPI.getApplyListByPage(this.current, this.limit, this.applyQuery)
        .then(response => { // 成功后数据赋值给页面初始值
          this.applyList = response.data.records
          this.total = response.data.total
        })
    },

    analysisData(value) {
      if (value === '0') {
        return '未审核'
      }
      if (value === '1') {
        return '申请通过'
      }
      if (value === '2') {
        return '申请不通过'
      }
    },

    updateApplyStatus(id, status) {
      applyAPI.updateApplyStatus(id, status)
        .then(response => {
          // 提示信息
          this.$message({
            type: 'success',
            message: '状态变更成功!'
          })
          this.getApplyListByPage()
        })
    }

  }
}
</script>

<style>

</style>
