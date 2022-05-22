<template>
  <div class="app-container">
    <!-- 导出 -->
    <el-form :inline="true" class="demo-form-inline">

      <el-form-item>
        <el-button type="primary" icon="el-icon-download" @click="export1()">导出未接种疫苗名单</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-download" @click="export2()">导出未接种第二次疫苗名单</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-download" @click="export3()">导出未接种第三次疫苗名单</el-button>
      </el-form-item>

    </el-form>
    <e-charts :option="option" class="chart"/>
  </div>
</template>

<script>
import API from '@/api/statistics/statistics'

export default {
  data() {
    return {
      regionalId: this.$store.getters.regionalId,
      data: {}
    }
  },

  computed: {
    option() {
      return {
        xAxis: {
          type: 'category',
          data: ['社区总人数', '未接种疫苗人数', '第一次疫苗接种人数', '第二次疫苗接种人数', '全剂次疫苗接种人数']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [
              {
                value: this.data.totalNum,
                itemStyle: {
                  color: '#00ff1a'
                }
              },
              {
                value: this.data.totalNum - this.data.oneNum,
                itemStyle: {
                  color: '#0037ff'
                }
              },
              {
                value: this.data.oneNum,
                itemStyle: {
                  color: '#ff00fb'
                }
              },
              {
                value: this.data.twoNum,
                itemStyle: {
                  color: '#a90000'
                }
              },
              {
                value: this.data.threeNum,
                itemStyle: {
                  color: '#d0ff00'
                }
              }
            ],
            type: 'bar'
          }
        ]
      }
    }
  },

  created() {
    this.getVaccinationEachTime()
  },

  methods: {
    getVaccinationEachTime() {
      API.getVaccinationEachTime(this.regionalId)
        .then(response => {
          this.data = response.data
        })
    },
    export1() {
      window.location.href = 'http://localhost:8222/statistics/export/1/' + this.regionalId
    },
    export2() {
      window.location.href = 'http://localhost:8222/statistics/export/2/' + this.regionalId
    },
    export3() {
      window.location.href = 'http://localhost:8222/statistics/export/3/' + this.regionalId
    }
  }

}
</script>

<style lang="css" scoped>
.chart {
    height: 600px;
}
</style>

