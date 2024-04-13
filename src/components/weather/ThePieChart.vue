<template>
  <BaseCard>
    <header>{{ dayString }}</header>
    <section>
      <div id="graph-legend">
        <ul>
          <PieChartLegendItem
            v-for="item in forecast"
            :key="item"
            :legendItem="item"
          />
        </ul>
      </div>
      <div id="graph-container">
        <PieChartCanvas :chartData="this.forecast" />
      </div>
    </section>
  </BaseCard>
</template>

<script>
import PieChartCanvas from "./PieChartCanvas.vue";
import PieChartLegendItem from "./PieChartLegendItem.vue";

export default {
  props: ["forecastData", "dayOfData"],
  components: { PieChartCanvas, PieChartLegendItem },
  computed: {
    forecast() {
      const forecast = this.forecastData.map((fore) => {
        return {
          description: fore.weather[0].description,
          code: fore.weather[0].icon,
        };
      });
      const groupedData = {};

      forecast.forEach((data) => {
        if (Object.keys(groupedData).includes(data.description)) {
          groupedData[data.description].value += 1;
        } else {
          groupedData[data.description] = {
            value: 1,
            code: data.code,
            description: data.description,
          };
        }
      });

      return groupedData;
    },
    dayString() {
      const dateFormat = new Intl.DateTimeFormat("it-IT", {
        dateStyle: "full",
      });
      return dateFormat.format(this.dayOfData).toUpperCase();
    },
  },
};
</script>

<style scoped>
header {
  font-weight: 500;
  margin: 0.5rem 0 1rem;
  font-size: 1.2rem;
}

section {
  display: flex;
  align-items: start;
  justify-content: space-between;
}

#graph-container {
  aspect-ratio: 1/1;
  width: 50%;
}
</style>
