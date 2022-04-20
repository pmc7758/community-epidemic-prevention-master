<template>
  <div class="app-container">

    <!-- 条件查询 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="订单编号">
        <el-input v-model="orderQuery.orderId" placeholder="订单编号"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getOrderListByPage()">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="orderList"
      border
      fit
      style="width: 100%"
      highlight-current-row>

      <el-table-column fixed prop="realName" label="下单人" align="center"/>

      <el-table-column prop="phone" label="下单电话" align="center"/>

      <el-table-column prop="address" label="收货地址" width="200" align="center"/>

      <el-table-column label="货物图片" width="160" align="center">
        <template slot-scope="scope">
          <el-image :src="scope.row.picture" style="width: 70px; height: 70px"/>
        </template>
      </el-table-column>

      <el-table-column prop="tradeName" label="货物名称" width="180" align="center"/>

      <el-table-column label="订单状态" width="80" align="center">
        <template slot-scope="scope">
          {{ formStatus(scope.row.status) }}
        </template>
      </el-table-column>

      <el-table-column prop="quantity" label="数量" align="center"/>

      <el-table-column prop="createTime" label="下单时间" align="center"/>

      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="refuseOrderById(scope.row.id)">拒接</el-button>
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="receiveOrderById(scope.row.id)">接收配送</el-button>
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
      @current-change="getOrderListByPage"/>
  </div>
</template>

<script>
import goodsAPI from '@/api/goods/goods'

export default {
  inject: ['reload'],
  data() { // 定义变量和初始值
    return {
      ordersList: null,
      total: 0, // 总记录数
      current: 1, // 当前页
      limit: 10, // 每页数据个数
      orderQuery: {
        regionalId: '1461218798756454402',
        status: '',
        orderId: ''
      }
    }
  },
  created() { // 页面渲染之前执行，调用methods定义的方法
    this.getOrderListByPage()
  },
  methods: {
    // 条件查询列表
    getOrderListByPage(current = 1) {
      this.current = current
      goodsAPI.getOrderListByPage(this.current, this.limit, this.orderQuery)
        .then(response => { // 成功后数据赋值给页面初始值
          this.orderList = response.data.records
          this.total = response.data.total
          console.log(this.total)
        })
        .catch(error => { // 失败
          console.log(error)
        })
    },
    formStatus(status) {
      if (status === 0) {
        return '未处理'
      }
      if (status === 1) {
        return '配送中'
      }
      if (status === 2) {
        return '已拒接'
      }
      if (status === 3) {
        return '已完成'
      }
    },
    receiveOrderById(id) {
      this.$confirm('此操作将接受配送该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        goodsAPI.updateOrderStatus(id, 1)
          .then(response => {
            this.$message({
              type: 'success',
              message: '接受成功，正配送!'
            })
            this.reload()
          })
      })
    },
    refuseOrderById(id) {
      this.$confirm('此操作将拒接该订单信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        goodsAPI.updateOrderStatus(id, 2)
          .then(response => {
            this.$message({
              type: 'success',
              message: '已拒接该订单'
            })
            this.reload()
          })
      })
    }
  }
}
</script>

<style>

</style>
