<template>
  <BaseCard :class="{ hidden: !showCard }">
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
import { showCardTransitionTime } from "@/config";
import PieChartCanvas from "./PieChartCanvas.vue";
import PieChartLegendItem from "./PieChartLegendItem.vue";

/**
 * Carta che contiene il grafico a torta
 * Riceve:
 * forecastData: Object, dati delle previsioni meteo nelle coordinate della città selezionata nel giorno indicato tramite i filtri
 * dayOfData: Date Object, il giorno indicato tramite i filtri
 */
export default {
  /**
   * showCard: bool, serve a gestire l'animazione di scorrimento
   */
  data() {
    return {
      showCard: false,
    };
  },
  props: ["forecastData", "dayOfData"],
  components: { PieChartCanvas, PieChartLegendItem },
  computed: {
    /**
     * Raggruppa i dati del meteo
     * Restituisce un oggetto del tipo {description: {value: # di occorrenze del meteo, code: codice del meteo, description: descrizione del meteo}}
     */
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
    }, showCardTransitionTime * 4);
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

@media screen and (min-width: 1200px) {
  section {
    flex-direction: column;
  }

  #graph-container {
    aspect-ratio: 1/1;
    width: 15rem;
  }
}
</style>
