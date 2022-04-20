<template>
  <div class="register-container">
    <el-form ref="registerUser" :model="registerUser" :rules="registerRules" class="register-form" auto-complete="on" label-position="left">
      <h3 class="title">注册区域管理员</h3>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="registerUser.username" name="username" type="text" auto-complete="on" placeholder="账号" />
      </el-form-item>

      <el-form-item prop="email">
        <span class="svg-container">
          <svg-icon icon-class="邮箱" />
        </span>
        <el-input v-model="registerUser.email" name="email" type="text" auto-complete="on" placeholder="邮箱" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :type="pwdType"
          v-model="registerUser.password"
          name="password"
          auto-complete="on"
          placeholder="密码" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>

      <el-form-item prop="confirmPwd">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :type="pwdType"
          v-model="registerUser.confirmPwd"
          name="password"
          auto-complete="on"
          placeholder="确认密码"/>
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>

      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleRegister">
          邮 箱 激 活
        </el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" style="width:100%;" @click="toLogin">
          登 录
        </el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import registerAPI from '@/api/register'

export default {
  name: 'Register',
  data() {
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
      registerUser: {
        username: '',
        email: '',
        password: '',
        confirmPwd: ''
      },
      registerRules: {
        username: [{ required: true, trigger: 'blur', message: '账号不能为空' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符之间', trigger: 'blur' }],

        email: [{ required: true, trigger: 'blur', message: '邮箱不能为空' },
          { trigger: 'blur', validator: checkEmail, message: '邮箱格式不对' }],

        password: [{ required: true, trigger: 'blur', message: '密码不能为空' },
          { min: 8, max: 20, message: '长度在 8 到 20 个字符之间', trigger: 'blur' }],

        confirmPwd: [{ required: true, trigger: 'blur', message: '确认密码不能为空' }]
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined
    }
  },
  methods: {
    // 密码暗文查看
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },

    // 邮箱激活注册
    handleRegister() {
      if (this.registerUser.confirmPwd !== this.registerUser.password) {
        this.$message.error('确认密码不一致，重新设置!')
      } else {
        registerAPI.registerAdmin(this.registerUser)
          .then(response => {
            this.$message({
              type: 'success',
              message: response.data
            })
          })
      }
    },

    // 登录跳转
    toLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.register-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.register-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .register-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
