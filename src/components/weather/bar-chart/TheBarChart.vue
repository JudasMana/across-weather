<template>
  <BaseCard :class="{ hidden: !showCard }">
    <header>{{ dayString }}</header>
    <BarChartCanvas :chartData="this.forecast" :filters="dataFilters" />
  </BaseCard>
</template>

<script>
import { fillForecasts } from "../../../helpers";
import { showCardTransitionTime } from "@/config";
import BarChartCanvas from "./BarChartCanvas.vue";

export default {
  data() {
    return {
      showCard: false,
    };
  },
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
      const dateFormat = new Intl.DateTimeFormat("en-EN", {
        dateStyle: "full",
      });
      return dateFormat.format(this.dayOfData).toUpperCase();
    },
  },
  mounted() {
    setTimeout(() => {
      this.showCard = true;
    }, showCardTransitionTime * 3);
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
