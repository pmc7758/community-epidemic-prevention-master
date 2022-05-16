<template>
  <div class="app-container">
    <el-form ref="goods" :model="goods" :rules="goodsRules" label-width="100px">
      <el-form-item prop="tradeName" label="商品名称">
        <el-input v-model="goods.tradeName" placeholder="请输入商品名称"/>
      </el-form-item>

      <el-form-item prop="introduction" label="商品描述">
        <el-input v-model="goods.introduction" placeholder="请输入商品描述"/>
      </el-form-item>

      <el-form-item prop="stock" label="库存">
        <el-input v-model="goods.stock" placeholder="请输入商品库存，单位为件"/>
      </el-form-item>

      <el-form-item prop="quantityUnit" label="件/数量">
        <el-input v-model="goods.quantityUnit" placeholder="请输入每件商品的数量，数量后面表明只/斤/个/件（10个：表示一件商品包含10个口罩）"/>
      </el-form-item>

      <el-form-item prop="picture" label="商品图片">
        <el-upload
          :on-success="handlePictureUploadSuccess"
          :on-remove="handlePicRemove"
          :before-remove="beforePicRemove"
          :limit="1"
          :file-list="pictureList"
          :action="BASE_API + '/oss/getOssFile'"
          class="upload-demo"
          drag
          list-type="picture"
          multiple>
          <i class="el-icon-upload"/>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>

      <el-form-item prop="auditQualification" label="资质图">
        <el-upload
          :limit="1"
          :on-remove="handleAuRemove"
          :before-remove="beforeAuRemove"
          :on-success="handleAuditQualificationUploadSuccess"
          :file-list="fileList"
          :action="BASE_API + '/oss/getOssFile'"
          class="upload-demo"
          drag
          list-type="picture"
          multiple>
          <i class="el-icon-upload"/>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveGoods">立即保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import goodsAPI from '@/api/goods/goods'

export default {
  data() {
    return {
      goods: {
        videoOriginalName: '',
        regionalId: '1461218798756454402',
        tradeName: '',
        picture: '',
        introduction: '',
        stock: '',
        quantityUnit: '',
        auditQualification: ''
      },
      goodsRules: {
        tradeName: [{ required: true, trigger: 'blur', message: '商品名称不能为空' },
          { max: 20, message: '长度在 20 个字符之内', trigger: 'blur' }],
        introduction: [{ required: true, trigger: 'blur', message: '商品描述不能为空' }],
        stock: [{ required: true, trigger: 'blur', message: '库存不能为空' }],
        auditQualification: [{ required: true, trigger: 'blur', message: '请上传资质图' }],
        picture: [{ required: true, trigger: 'blur', message: '请上传商品图片' }]
      },
      pictureList: [], // 上传文件列表
      fileList: [],
      BASE_API: process.env.BASE_API,
      saveBtnDisabled: false
    }
  },

  created() {
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id
      this.getGoodsInfo(id)
    }
  },

  methods: {

    saveGoods() {
      this.$refs['goods'].validate((valid) => {
        if (valid) {
          goodsAPI.addgoods(this.goods)
            .then(response => {
              // 提示信息
              this.$message({
                type: 'success',
                message: '添加成功!'
              })
              // 回到列表页 路由跳转
              this.$router.push({ path: '/goods/table' })
            })
        } else {
          return false
        }
      })
    },

    // 上传图片成功后拿到图片url
    handlePictureUploadSuccess(response, file, fileList) {
      this.goods.picture = response.data
      this.goods.videoOriginalName = file.name
    },

    // 上传图片成功后拿到图片url
    handleAuditQualificationUploadSuccess(response, file, fileList) {
      this.goods.auditQualification = response.data
      this.goods.videoOriginalName = file.name
    },

    getGoodsInfo(id) {
      goodsAPI.getGoodsInfo(id)
        .then(respones => {
          var name = this.getCaption(respones.data.picture)
          this.goods = respones.data
          var arrayObj = []
          var obj = {}
          obj.url = respones.data.picture
          obj.name = name
          arrayObj.push(obj)
          this.pictureList = arrayObj

          var name1 = this.getCaption(respones.data.auditQualification)
          var arrayObj1 = []
          var obj1 = {}
          obj1.url = respones.data.auditQualification
          obj1.name = name1
          arrayObj1.push(obj1)
          this.fileList = arrayObj1
        })
    },

    getCaption(obj) {
      var index = obj.lastIndexOf('/')// 若不能识别，前面加转义字符 \

      obj = obj.substring(index + 1, obj.length)

      return obj
    },

    // 点击×调用这个方法弹出提示
    beforePicRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },

    // 点击确定删除调用的方法
    handlePicRemove() {
      // 把文件列表清空
      this.pictureList = []
    },

    // 点击×调用这个方法弹出提示
    beforeAuRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },

    // 点击确定删除调用的方法
    handleAuRemove() {
      // 把文件列表清空
      this.pictureList = []
    }

  }

}
</script>
