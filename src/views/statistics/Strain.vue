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
        xAxis: {
          type: 'category',
          data: ['阿尔法毒株', '贝塔毒株', '伽马变异株', '德尔塔毒株', '奥密克戎毒株', '混合型毒株']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [
              {
                value: this.data.alpha,
                itemStyle: {
                  color: '#00ff1a'
                }
              },
              {
                value: this.data.beta,
                itemStyle: {
                  color: '#0037ff'
                }
              },
              {
                value: this.data.gamma,
                itemStyle: {
                  color: '#ff00fb'
                }
              },
              {
                value: this.data.delta,
                itemStyle: {
                  color: '#a90000'
                }
              },
              {
                value: this.data.omicron,
                itemStyle: {
                  color: '#d0ff00'
                }
              },
              {
                value: this.data.blend,
                itemStyle: {
                  color: '#ff3700'
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
    this.getProportionOfStrains()
  },

  methods: {
    getProportionOfStrains() {
      API.getProportionOfStrains(this.regionalId)
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

