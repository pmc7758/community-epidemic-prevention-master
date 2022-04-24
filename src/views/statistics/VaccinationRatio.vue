<template>
  <div class="app-container">
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
        title: {
          text: '社区全剂次接种疫苗比例状况',
          subtext: ' ',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '社区总人口：' + this.data.totalNum,
            type: 'pie',
            radius: '50%',
            data: [
              { value: this.data.totalNum - this.data.vaccinationsNum, name: '未全剂次接种人数' },
              { value: this.data.vaccinationsNum, name: '全剂次接种人数' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  },

  created() {
    this.getVaccinationStatistics()
  },

  methods: {
    getVaccinationStatistics() {
      API.getVaccinationStatistics(this.regionalId)
        .then(response => {
          this.data = response.data
        })
    }
  }

}
</script>

<style lang="css" scoped>
.chart {
    height: 600px;
}
</style>
