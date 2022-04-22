<template>
  <div class="app-container">
    <e-charts :option="option" class="chart"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      option: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', '2', '3']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]
      }
    }
  }
}
</script>

<style lang="css" scoped>
.chart {
    height: 400px;
}
</style>
