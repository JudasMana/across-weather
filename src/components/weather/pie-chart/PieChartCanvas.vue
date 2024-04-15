<template>
  <canvas ref="canvasPie"></canvas>
</template>

<script>
import Chart from "chart.js/auto";
import { getColor } from "../../../helpers";

/**
 * Componente che mostra il grafico a torta
 * Riceve:
 * chartData: dati da reportizzare
 */
export default {
  props: ["chartData"],
  /**
   * pieChart: Chart Object (da Chart.js)
   */
  data() {
    return {
      pieChart: null,
    };
  },
  methods: {
    /**
     * Assegna a pieChart l'oggetto Chart del grafico a torta e lo disegna nel canvas
     */
    async drawPie() {
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
  /**
   * Disegna il grafico al mount
   */
  mounted() {
    this.drawPie();
  },
  watch: {
    /**
     * Disegna il grafico quando dei dati vengono aggiornati
     */
    chartData() {
      if (!this.pieChart) {
        return;
      }
      this.pieChart.destroy();
      this.drawPie();
    },
  },
};
</script>

<style>
canvas {
  box-sizing: border-box;
}
</style>
