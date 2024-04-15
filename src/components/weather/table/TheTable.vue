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

/**
 * Componente che mostra la tabella
 * Riceve:
 * forecastData: Object, dati delle previsioni meteo nelle coordinate della città selezionata nel giorno indicato tramite i filtri
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
  props: ["dayOfData", "forecastData"],
  components: { TableRow },
  computed: {
    /**
     * Formatta la stringa del giorno selezionato
     */
    dayString() {
      const dateFormat = new Intl.DateTimeFormat("en-EN", {
        dateStyle: "full",
      });
      return dateFormat.format(this.dayOfData).toUpperCase();
    },
    /**
     * Prepara i dati da mostrare nella tabella tramite fillForecasts (vd. helpers.js)
     */
    forecast() {
      return fillForecasts(this.forecastData);
    },
  },
  /**
   * Gestisce l'animazione di scorrimento
   */
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

@media screen and (min-width: 1200px) {
  #hour-column {
    width: 40%;
  }
}
</style>
