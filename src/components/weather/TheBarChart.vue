<template>
  <BaseCard>
    <header>{{ dayString }}</header>
    <BarChartCanvas :chartData="this.forecast" :filters="dataFilters" />
  </BaseCard>
</template>

<script>
import { fillForecasts } from "../..//helpers";
import BarChartCanvas from "./BarChartCanvas.vue";

export default {
  props: ["forecastData", "dataFilters", "dayOfData"],
  components: { BarChartCanvas },
  computed: {
    forecast() {
      const prop = Object.entries(this.dataFilters).filter(
        (item) => item[1] == true
      )[0][0];
      return fillForecasts(this.forecastData, `${prop}`);
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
</style>
