<template>
  <BaseCard :class="{ hidden: !showCard }">
    <header>{{ dayString }}</header>
    <table>
      <thead>
        <tr id="fields-names">
          <th id="hour-column">Hour</th>
          <th>Temperature</th>
          <th>Weather</th>
        </tr>
      </thead>
      <tbody>
        <TableRow
          v-for="(hour, i) in forecast"
          :key="hour.date"
          :time="hour.date"
          :temp="hour.value"
          :weatherCode="hour.icon"
          :delay="i"
        />
      </tbody>
    </table>
  </BaseCard>
</template>

<script>
import { fillForecasts } from "@/helpers";
import { showCardTransitionTime } from "@/config";
import TableRow from "./TableRow";

export default {
  data() {
    return {
      showCard: false,
    };
  },
  props: ["dayOfData", "forecastData"],
  components: { TableRow },
  computed: {
    dayString() {
      const dateFormat = new Intl.DateTimeFormat("en-EN", {
        dateStyle: "full",
      });
      return dateFormat.format(this.dayOfData).toUpperCase();
    },
    forecast() {
      return fillForecasts(this.forecastData, "mainTemp");
    },
  },
  mounted() {
    setTimeout(() => {
      this.showCard = true;
    }, showCardTransitionTime * 2);
  },
};
</script>

<style scoped>
header {
  font-weight: 500;
  margin: 0.5rem 0 1rem;
  font-size: 1.2rem;
}

table {
  border-collapse: collapse;
}

th {
  border-bottom: 1px solid black;
  padding: 0 0 0.5rem;
}

#hour-column {
  width: 60%;
  text-align: start;
  padding-left: 1rem;
}
</style>
