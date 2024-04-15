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

/**
 * Carta che contiene il grafico a barre
 * Riceve:
 * forecastData: Object, dati delle previsioni meteo nelle coordinate della città selezionata nel giorno indicato tramite i filtri
 * dataFilters: filtri sui dati selezionati
 * dayOfData: Date Object, il giorno indicato tramite i filtri
 */
export default {
  /**
   * showCard: bool, serve a gestire l'animazione di scorrimento al mount
   */
  data() {
    return {
      showCard: false,
    };
  },
  props: ["forecastData", "dataFilters", "dayOfData"],
  components: { BarChartCanvas },
  computed: {
    /**
     * Prepara i dati da mostrare nel grafico tramite fillForecasts (vd. helpers.js)
     */
    forecast() {
      const prop = Object.entries(this.dataFilters).filter(
        (item) => item[1] == true
      )[0][0];
      return fillForecasts(this.forecastData, `${prop}`);
    },
    /**
     * Formatta la stringa del giorno selezionato
     */
    dayString() {
      const dateFormat = new Intl.DateTimeFormat("en-EN", {
        dateStyle: "full",
      });
      return dateFormat.format(this.dayOfData).toUpperCase();
    },
  },
  /**
   * Gestisce l'animazione di scorrimento
   */
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
