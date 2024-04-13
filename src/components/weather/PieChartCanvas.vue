<template>
  <canvas ref="canvasPie"></canvas>
</template>

<script>
import Chart from "chart.js/auto";
import { getColor } from "../../helpers";

export default {
  props: ["chartData"],
  data() {
    return {
      pieChart: null,
    };
  },
  methods: {
    async drawStandardPie() {
      this.pieChart = new Chart(this.$refs.canvasPie, {
        type: "pie",
        options: {
          animation: true,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: true,
            },
          },
        },
        data: {
          labels: Object.values(this.chartData).map((data) => data.description),
          datasets: [
            {
              data: Object.values(this.chartData).map((data) => data.value),
              backgroundColor: Object.values(this.chartData).map((data) =>
                getColor(data.code)
              ),
            },
          ],
        },
      });
    },
  },
  mounted() {
    console.log(this.chartData);
    this.drawStandardPie();
  },
  watch: {
    chartData() {
      if (!this.pieChart) {
        return;
      }
      this.pieChart.destroy();
      this.drawStandardPie();
    },
  },
};
</script>
