<template>
  <div class="app-container">
    <el-form ref="member" :model="member" :rules="memberRules" label-width="50px">
      <el-form-item label="姓名" prop="realName">
        <el-input v-model="member.realName" placeholder="请输入姓名"/>
      </el-form-item>

      <el-form-item label="性别">
        <el-radio-group v-model="member.sex">
          <el-radio label="2">男</el-radio>
          <el-radio label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="年龄" prop="age">
        <el-input v-model="member.age" placeholder="请输入年龄"/>
      </el-form-item>

      <el-form-item label="电话" prop="phone">
        <el-input v-model="member.phone" placeholder="请输入电话"/>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="member.email" placeholder="请输入邮箱"/>
      </el-form-item>

      <el-form-item label="地址" prop="address">
        <el-input v-model="member.address" placeholder="请输入详细的家庭地址"/>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">立即保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import memberApi from '@/api/member/list'

export default {
  data() {
    // 电话号码 验证
    const checkPhon_num = (rule, value, callback) => {
      if (value) {
        if (!/^1[34578]\d{9}$/.test(value)) {
          callback(new Error(' 请输入正确的电话号码！'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    // 邮箱校验规则
    const checkEmail = (rule, value, callback) => {
      const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (emailReg.test(value) || value === '') {
        return callback()
      } else {
        callback(new Error('邮箱格式错误'))
      }
    }
    return {
      flag: true,
      member: {
        regionalId: this.$store.getters.regionalId,
        realName: '',
        sex: '2',
        age: '',
        phone: '',
        address: '',
        email: ''
      },
      memberRules: {
        realName: [{ required: true, trigger: 'blur', message: '姓名不能为空' },
          { max: 20, message: '长度在 20 个字符之内', trigger: 'blur' }],

        phone: [{ required: true, trigger: 'blur', message: '电话不能为空' },
          { trigger: 'blur', validator: checkPhon_num }],

        email: [{ required: true, trigger: 'blur', message: '邮箱不能为空' },
          { trigger: 'blur', validator: checkEmail }]
      },

      saveBtnDisabled: false
    }
  },

  created() {
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id
      this.getMemberInfo(id)
      this.flag = false
    }
  },

  methods: {
    saveOrUpdate() {
      this.$refs['member'].validate((valid) => {
        if (valid) {
          this.saveMember()
        } else {
          return false
        }
      })
    },

    saveMember() {
      memberApi.addOrUpdateMember(this.flag, this.member)
        .then(response => {
          // 提示信息
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          // 回到列表页 路由跳转
          this.$router.push({ path: '/members/table' })
        })
    },

    getMemberInfo(id) {
      memberApi.getMemberInfo(id)
        .then(respones => {
          this.member = respones.data
          console.log(this.member)
          this.member.sex = (this.member.sex === 1 ? '1' : '2')
        })
    }
  }
}
</script>
