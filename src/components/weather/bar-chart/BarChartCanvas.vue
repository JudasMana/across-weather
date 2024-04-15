<template>
  <canvas ref="canvasBar"></canvas>
</template>

<script>
import Chart from "chart.js/auto";

/**
 * Componente che mostra il grafico a barre
 * Riceve:
 * chartData: dati da reportizzare
 * filters: filtri sui dati selezionati
 */
export default {
  props: ["chartData", "filters"],
  /**
   * barChart: Chart Object (da Chart.js)
   */
  data() {
    return {
      barChart: null,
    };
  },
  methods: {
    /**
     * Assegna a barChart l'oggetto Chart del grafico a barre e lo disegna nel canvas
     */
    async drawBar() {
      this.chart = new Chart(this.$refs.canvasBar, {
        type: "bar",
        options: {
          animation: true,
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: true,
              position: "nearest",
              mode: "nearest",
              intersect: false,
              xAlign: "center",
              yAlign: "bottom",
              backgroundColor: "rgb(36, 61, 34)",
              borderColor: "rgb(92, 82, 82)",
              borderWidth: 1,
              callbacks: {
                label: (context) => {
                  return this.getLabel(context);
                },
                title: () => {
                  return "";
                },
              },
            },
          },
          scales: {
            y: {
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
              hoverBackgroundColor: "rgb(60,179,113)",
              hoverBorderColor: "rgb(36, 61, 34)",
            },
          },
        },
        data: {
          labels: this.chartData.map((row) => row.date),
          datasets: [
            {
              label: this.axisYTitle,
              data: this.chartData.map((row) => row.value),
              barPercentage: 1,
              categoryPercentage: 0.8,
            },
          ],
        },
      });
    },
    /**
     * Assegna a barChart l'oggetto Chart del grafico a linee e lo disegna nel canvas
     */
    async drawLine() {
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
              position: "nearest",
              mode: "nearest",
              intersect: false,
              xAlign: "center",
              yAlign: "bottom",
              backgroundColor: "rgb(36, 61, 34)",
              borderColor: "rgb(92, 82, 82)",
              borderWidth: 1,
              callbacks: {
                label: (context) => {
                  let label = context.dataset.label;

                  return (label += `: ${context.parsed.y.toFixed(1)} °C`);
                },
                title: () => {
                  return "";
                },
              },
            },
          },
          scales: {
            x: {
              stacked: false,
            },
            y: {
              stacked: false,
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
              data: this.chartData.map((data) => data.value[0]),
              backgroundColor: "rgba(11, 127, 171, 0.6)",
              borderColor: "rgb(11, 127, 171)",
              borderWidth: 2,
            },
            {
              label: "Max Temperature",
              data: this.chartData.map((data) => data.value[1]),
              backgroundColor: "rgba(175, 65, 84, 0.6)",
              borderColor: "rgb(175, 65, 84)",
              borderWidth: 2,
            },
          ],
        },
      });
    },
    /**
     * Calcola l'etichetta (del tooltip) di dati corretta in base ai filtri selezionati
     * Restituisce una stringa
     */
    getLabel(context) {
      let label = "";

      if (this.filters.mainTemp) {
        label += `Temperature: ${context.parsed.y.toFixed(1)} °C`;
      }
      if (this.filters.humidity) {
        label += `Humidity: ${context.parsed.y.toFixed(0)}%`;
      }
      if (this.filters.wind) {
        label += `Wind speed: ${context.parsed.y.toFixed(1)}m/s`;
      }

      return label;
    },
  },
  /**
   * Disegna il grafico corretto al mount in base ai filtri selezionati
   */
  mounted() {
    this.filters.minMaxTemp ? this.drawLine() : this.drawBar();
  },
  watch: {
    /**
     * Disegna il grafico corretto in base ai filtri selezionati quando dei dati vengono aggiornati
     */
    chartData() {
      this.chart.destroy();
      this.filters.minMaxTemp ? this.drawLine() : this.drawBar();
    },
  },
  computed: {
    /**
     * Calcola l'etichetta (dell'asse) corretta in base ai filtri selezionati
     */
    axisYTitle() {
      if (this.filters.mainTemp) {
        return "Temperature (°C)";
      }
      if (this.filters.humidity) {
        return "Humidity (%)";
      }
      if (this.filters.wind) {
        return "Wind speed (m/s)";
      }
      return "";
    },
  },
};
</script>
