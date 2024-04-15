<template>
  <main>
    <div id="medium-container" v-if="isLoading && !error">
      <TheSpinner />
    </div>
    <BaseCard v-if="!isLoading && error">
      <p>Something ewent wrong...</p>
    </BaseCard>
    <section v-if="!isLoading && !error && weatherData">
      <div class="mainWeatherContainer">
        <MainWeather :weatherData="weatherData" :cityData="cityData" />
      </div>
      <div class="filtersContainer">
        <TheFilter :currentFilters="filters" @update-filters="updateFilters" />
      </div>
      <div class="tableContainer">
        <TheTable
          :dayOfData="dayOfTheFilter"
          :forecastData="forecastDataOfTheDay"
        />
      </div>
      <div class="barChartContainer">
        <TheBarChart
          :forecastData="forecastDataOfTheDay"
          :dataFilters="filters.dataFilters"
          :dayOfData="dayOfTheFilter"
        />
      </div>
      <div class="pieChartContainer">
        <ThePieChart
          :forecastData="forecastDataOfTheDay"
          :dayOfData="dayOfTheFilter"
        />
      </div>
    </section>
  </main>
</template>

<script>
import MainWeather from "./MainWeather.vue";
import TheTable from "./table/TheTable";
import TheBarChart from "./bar-chart/TheBarChart.vue";
import ThePieChart from "./pie-chart/ThePieChart.vue";
import TheFilter from "./filters/TheFilter";
import { fuso } from "../../config";

/**
 * Componente che mostra i dati del meteo per la città selezionata
 * Riceve:
 * cityData: Object, oggetto con info nelle coordinaate della città seelzionata
 * weatherData: Object, informaizoni prese daall'API riguardo al meteo attuale nelle coordinaate della città seelzionata
 * isLoading: bool, indica se è in corso il fetch dalle API
 * error: bool, indicaa se il fetch dalle API non è andat a buon fine
 */
export default {
  props: ["cityData", "weatherData", "forecastData", "isLoading", "error"],
  /**
   * filters: dati sui filtri attualmente selezionati (divisi tra filtri temporali e ai dati)
   */
  data() {
    return {
      filters: {
        timeFilters: {
          restOfTheDay: true,
          tomorrow: false,
          theDayAfter: false,
        },
        dataFilters: {
          mainTemp: true,
          minMaxTemp: false,
          humidity: false,
          wind: false,
        },
      },
    };
  },
  components: {
    MainWeather,
    TheBarChart,
    TheFilter,
    ThePieChart,
    TheTable,
  },
  methods: {
    /**
     * Metodo che aggiorna i filtri
     * Lanciato in seguito all'evento custom update-filters
     */
    updateFilters(obj) {
      this.filters = obj;
    },
  },
  computed: {
    /**
     * Ricava il giorno da reportizzare nelle componenti
     * Lo restituisce come oggetto Date
     * Notare che dopo le 23 (21 + 2h di fuso orario) si scala al girono successivo
     */
    dayOfTheFilter() {
      let daysToAdd;
      if (this.filters.timeFilters.restOfTheDay) {
        daysToAdd = 0;
      } else if (this.filters.timeFilters.tomorrow) {
        daysToAdd = 1;
      } else if (this.filters.timeFilters.theDayAfter) {
        daysToAdd = 2;
      }

      let date = new Date();

      if (+date.getHours() >= 21 + fuso) {
        daysToAdd++;
      }

      return new Date(date.setDate(date.getDate() + daysToAdd));
    },
    /**
     * Filtra i forecastData tenendo solo i dati relativi ail giorno ricavato in dayOfTheFilter
     */
    forecastDataOfTheDay() {
      return this.forecastData.list.filter((fore) => {
        return (
          new Date(fore.dt_txt).getDate() === this.dayOfTheFilter.getDate() &&
          new Date(fore.dt_txt).getMonth() === this.dayOfTheFilter.getMonth()
        );
      });
    },
  },
};
</script>

<style scoped>
main {
  width: var(--main-width);
  margin: 2rem 0 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

section {
  width: 100%;
  height: max-content;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.mainWeatherContainer {
  grid-area: weather;
  width: 100%;
  height: max-content;
}

.filtersContainer {
  grid-area: filter;
  width: 100%;
  height: max-content;
}

.tableContainer {
  grid-area: tabella;
  width: 100%;
}

.barChartContainer {
  grid-area: barChart;
  width: 100%;
  height: max-content;
}

.pieChartContainer {
  grid-area: pieChart;
  width: 100%;
}

#medium-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(255, 253, 253);
  aspect-ratio: 1/1;
  border-radius: 10px;
  box-shadow: 0 0 5px var(--main-black);
  padding: 1rem;
  margin: 1rem 0;
}

@media screen and (min-width: 1200px) {
  section {
    display: grid;
    grid-template-areas: "weather weather" "filter filter" "barChart barChart" "tabella pieChart";
    grid-template-columns: 4fr 3fr;
    place-items: start;
    width: var(--main-width);
    column-gap: 1rem;
  }

  .filtersContainer {
    height: max-content;
  }

  .tableContainer {
    height: max-content;
  }

  .barChartContainer {
    height: max-content;
  }

  .pieChartContainer {
    height: max-content;
  }
}

@media screen and (min-width: 1400px) {
  section {
    grid-template-areas: "weather weather" "filter barChart" "tabella pieChart";
    grid-template-columns: 1fr 1fr;
    row-gap: 1rem;
  }

  .filtersContainer {
    height: 100%;
  }

  .barChartContainer {
    height: 100%;
  }
}
</style>
