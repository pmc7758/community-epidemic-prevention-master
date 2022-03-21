<template>
    <div class="app-container">

        <!-- 条件查询 -->
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="货物名称">
              <el-input v-model="goodsQuery.tradeName" placeholder="货物名称"></el-input>
            </el-form-item>
            
            <el-form-item>
              <el-button type="primary" @click="getGoodsListByPage()">查询</el-button>
            </el-form-item>
        </el-form>

        <el-table
            :data="goodsList"
            border
            fit
            style="width: 100%"
            highlight-current-row>

            <el-table-column label="货物图片" width="180" align="center">
                <template slot-scope="scope">
                    <el-image :src="scope.row.picture" style="width: 70px; height: 70px"></el-image>
                </template>
            </el-table-column>

            <el-table-column prop="tradeName" label="货物" width="180" align="center">
            </el-table-column>

            <el-table-column prop="stock" label="库存" width="80" align="center">
            </el-table-column>

            <el-table-column prop="introduction" label="商品描述" align="center">
            </el-table-column>

            <el-table-column label="资质" width="180" align="center">
                <template slot-scope="scope">
                    <el-image :src="scope.row.auditQualification" style="width: 70px; height: 70px"></el-image>
                </template>
            </el-table-column>

            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <router-link :to="'/goods/edit/' + scope.row.id">
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
                    @click="deleteGoodsById(scope.row.id)">下架</el-button>
                </template>
            </el-table-column>

        </el-table>

        <!-- 分页 -->
        <el-pagination
            background
            layout="total, prev, pager, next"
            :total="total"
            :page-size="limit"
            :current-page="current"
            style="padding: 30px 0; text-aling: center"
            @current-change="getGoodsListByPage">
        </el-pagination>
    </div>
</template>

<script>
import goodsAPI from '@/api/goods/goods'

export default {
    data() { // 定义变量和初始值
        return {
            goodsList:null,
            total:0, // 总记录数
            current:1, // 当前页
            limit:10, // 每页数据个数
            goodsQuery: {
                regionalId:'1461218798756454402',
                tradeName:'',
            },
        }
    },

    created() { // 页面渲染之前执行， 调用methods定义的方法
        this.getGoodsListByPage()
    },

    methods: { // 创建具体的方法，调用api里面的方法

        // 条件查询列表
        getGoodsListByPage(current = 1) {
            this.current = current
            goodsAPI.getGoodsList(this.current, this.limit, this.goodsQuery)
                .then(response => { // 成功后数据赋值给页面初始值
                    this.goodsList = response.data.records
                    this.total = response.data.total
                    console.log(this.goodsList)
                })
                .catch(error => { // 失败
                    console.log(error)
                })
        },

        // 删除货物
        deleteGoodsById(id) {
            this.$confirm('此操作将永久删除该货物信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                goodsAPI.deleteGoodsById(id)
                    .then(response => { // 成功
                        // 提示信息
                        this.$message({
                        type: 'success',
                        message: '删除成功!'
                        });
                        // 刷新
                        this.getGoodsListByPage()
                    })
            })
        }

    }
}
</script>
