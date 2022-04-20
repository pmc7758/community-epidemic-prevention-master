<template>
  <div class="dashboard-container">
    <el-descriptions id="adminDES" title="管理员信息" direction="vertical" border>
      <el-descriptions-item label="管理员账号">{{ name }}</el-descriptions-item>
      <el-descriptions-item label="管理员邮箱">{{ email }}</el-descriptions-item>
      <el-descriptions-item label="管理员角色">{{ roles[0] }}</el-descriptions-item>
    </el-descriptions>
    <el-descriptions v-if="isShow" title="社区信息" direction="vertical" border>
      <el-descriptions-item label="社区标识ID"><el-tag size="small">{{ regionalInfo.id }}</el-tag></el-descriptions-item>
      <el-descriptions-item label="社区风险级别">
        <el-tag size="small">{{ regionalInfo.riskLevel }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="社区地址">{{ regionalInfo.address }}</el-descriptions-item>
    </el-descriptions>
    <el-form v-if="!isShow" ref="regional" :model="regionalInfo" :rules="regionalRules" label-width="80px">
      <el-form-item label="详细地址" prop="address">
        <el-input v-model="regionalInfo.address"/>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveRegional">创建社区</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import regional from '@/api/regional/regional'

export default {
  name: 'Dashboard',
  inject: ['reload'],
  data() {
    return {
      saveBtnDisabled: false,
      isShow: true,
      regionalInfo: {
        riskLevel: '',
        address: '',
        adminId: this.$store.getters.id
      },
      regionalRules: {
        address: [{ required: true, trigger: 'blur', message: '社区地址不能为空，且要尽量详细' }]
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

  mounted() {
    this.getRegionalInfo()
  },

  methods: {
    // 查询社区信息
    getRegionalInfo() {
      regional.getRegional(this.regionalInfo.adminId)
        .then(response => {
          if (response.data == null) {
            this.isShow = false
          } else {
            this.regionalInfo = response.data
            this.$store.commit('SET_REGIONALID', this.regionalInfo.id)
          }
        })
    },
    saveRegional() {
      this.$refs['regional'].validate((valid) => {
        if (valid) {
          regional.addRegional(this.regionalInfo)
            .then(() => {
              this.$message.success('创建区域成功')
              this.reload()
            })
        } else {
          return false
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
