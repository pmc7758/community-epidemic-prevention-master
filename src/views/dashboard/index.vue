<template>
  <div class="dashboard-container">
    <el-button v-if="isShow" :disabled="saveBtnDisabled" type="primary" @click="save">添加区域信息</el-button>
    <div class="dashboard-text">管理员id:{{ id }}</div>
    <div class="dashboard-text">管理员姓名:{{ name }}</div>
    <div class="dashboard-text">管理员角色:<span v-for="role in roles" :key="role">{{ role }}</span></div>
    <div v-if="!isShow" class="dashboard-text">社区地址:{{ regionalInfo.address }}</div>
    <div v-if="!isShow" class="dashboard-text">社区风险级别:{{ regionalInfo.riskLevel }}</div>
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
      'id'
    ])
  },

  created() {
    this.getRegionalInfo()
  },

  methods: {
    getRegionalInfo() {
      regional.getRegional(this.id)
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
</style>
