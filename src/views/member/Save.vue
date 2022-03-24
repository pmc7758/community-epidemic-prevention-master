<template>
    <div class="app-container">
        <el-form label-width="50px">
            <el-form-item label="姓名">
                <el-input v-model="member.realName"></el-input>
            </el-form-item>

            <el-form-item label="性别">
                <el-radio-group v-model="member.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="年龄">
                <el-input v-model="member.age"></el-input>
            </el-form-item>

            <el-form-item label="电话">
                <el-input v-model="member.phone"></el-input>
            </el-form-item>

            <el-form-item label="邮箱">
                <el-input v-model="member.email"></el-input>
            </el-form-item>

           <el-form-item label="地址">
                <el-input v-model="member.address"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">立即保存</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import memberApi from '@/api/member/list'

export default {
    data() {
        return {
            member: {
                regionalId:'1461218798756454402',
                realName:'',
                password:'123456',
                sex:'',
                age:'',
                phone:'',
                address:'',
                email:''
            },
            saveBtnDisabled:false
        }
    },

    created() {
        if (this.$route.params && this.$route.params.id) {
            const id = this.$route.params.id
            this.getMemberInfo(id)
        }
    },

    methods: {
        saveOrUpdate() {
            this.saveMember()
        },

        saveMember() {
            memberApi.addMember(this.member)
                .then(response => {
                    // 提示信息
                    this.$message({
                    type: 'success',
                    message: '添加成功!'
                    });
                    // 回到列表页 路由跳转
                    this.$router.push({path:'/members/tree'})
                })
        },

        getMemberInfo(id) {
            memberApi.getMemberInfo(id)
                .then(respones => {
                    this.member = respones.data
                })
        }
    }
}
</script>