<template>
  <canvas ref="canvasPie"></canvas>
</template>

<script>
import Chart from "chart.js/auto";
import { getColor } from "../../../helpers";

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
              backgroundColor: "rgb(80, 141, 116)",
              borderColor: "rgb(36, 61, 34)",
              borderWidth: 2,
              callbacks: {
                title: (ctx) => {
                  return ctx[0].label.toUpperCase();
                },
                label: (ctx) => {
                  console.log(ctx.dataset.data);
                  const percentage = (
                    (ctx.parsed * 100) /
                    ctx.dataset.data.reduce((acc, item) => item + acc, 0)
                  ).toFixed(0);

                  return `${percentage}%`;
                },
                labelTextColor: () => {},
              },
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
              hoverBorderColor: "rgb(36, 61, 34)",
            },
          ],
        },
      });
    },
  },
  mounted() {
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
