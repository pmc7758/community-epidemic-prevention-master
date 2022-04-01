<template>
  <div class="dashboard-container">
    <el-descriptions id="adminDES" title="管理员信息" direction="vertical" border>
      <el-descriptions-item label="管理员账号">{{ name }}</el-descriptions-item>
      <el-descriptions-item label="管理员邮箱">{{ email }}</el-descriptions-item>
      <el-descriptions-item label="管理员角色">{{ role }}</el-descriptions-item>
    </el-descriptions>
    <el-descriptions title="社区信息" direction="vertical" border>
      <el-descriptions-item label="社区标识ID"><el-tag size="small">{{ regionalInfo.id }}</el-tag></el-descriptions-item>
      <el-descriptions-item label="社区风险级别">
        <el-tag size="small">{{ regionalInfo.riskLevel }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="社区地址">{{ regionalInfo.address }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import regional from '@/api/regional/regional'

export default {
  name: 'Dashboard',
  data() {
    return {
      isShow: false,
      regionalInfo: {
        riskLevel: '',
        address: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'id',
      'email'
    ])
  },

  created() {
    this.getRegionalInfo()
  },

  methods: {
    // 查询社区信息
    getRegionalInfo() {
      regional.getRegional(1)
        .then(response => {
          if (response.data == null) {
            this.isShow = true
          } else {
            this.regionalInfo = response.data
          }
        })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
#adminDES{
  margin-bottom: 50px;
}
</style>
