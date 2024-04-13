<template>
  <canvas ref="canvasBar"></canvas>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  props: ["chartData", "filters"],
  data() {
    return {
      barChart: null,
    };
  },
  methods: {
    async drawStandardBar() {
      this.chart = new Chart(this.$refs.canvasBar, {
        type: "bar",
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
          scales: {
            y: {
              max: this.maxYValue,
              title: {
                display: true,
                text: this.axisYTitle,
              },
            },
          },
          elements: {
            bar: {
              backgroundColor: "rgba(40, 121, 96, 0.6)",
              borderColor: "rgb(40, 121, 96)",
              borderWidth: 3,
            },
          },
        },
        data: {
          labels: this.chartData.map((row) => row.date),
          datasets: [
            {
              label: "Temperature by 3 hours",
              data: this.dataToShow,
              barPercentage: 1,
              categoryPercentage: 0.8,
            },
          ],
        },
      });
    },
    async drawStackedLine() {
      this.chart = new Chart(this.$refs.canvasBar, {
        type: "line",
        options: {
          animation: true,
          plugins: {
            legend: {
              display: true,
            },
            tooltip: {
              enabled: true,
            },
          },
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
              title: {
                display: true,
                text: this.axisYTitle,
              },
              ticks: {
                stepSize: 0.5,
              },
            },
          },
        },
        data: {
          labels: this.chartData.map((row) => row.date),
          datasets: [
            {
              label: "Min Temperature",
              data: this.dataToShow.map((data) => data[0]),
              backgroundColor: "rgba(11, 127, 171, 0.6)",
              borderColor: "rgb(11, 127, 171)",
              borderWidth: 2,
            },
            {
              label: "Max Temperature",
              data: this.dataToShow
                .filter((data) => data != [0, 0])
                .map((data) => data[1] - data[0]),
              backgroundColor: "rgba(175, 65, 84, 0.6)",
              borderColor: "rgb(175, 65, 84)",
              borderWidth: 2,
            },
          ],
        },
      });
    },
  },
  mounted() {
    this.filters.minMaxTemp ? this.drawStackedLine() : this.drawStandardBar();
  },
  watch: {
    chartData() {
      if (!this.chart) {
        return;
      }
      this.chart.destroy();
      this.filters.minMaxTemp ? this.drawStackedLine() : this.drawStandardBar();
    },
  },
  computed: {
    dataToShow() {
      return this.chartData.map((row) => {
        return row.value;
      });
    },
    maxYValue() {
      if (this.filters.humidity) {
        return null;
      }
      return null;
    },
    axisYTitle() {
      if (this.filters.mainTemp) {
        return "Temperature (°C)";
      }
      if (this.filters.humidity) {
        return "Humidity (%)";
      }
      if (this.filters.wind) {
        return "Wind speed (km/h)";
      }
      return "";
    },
  },
};
</script>
