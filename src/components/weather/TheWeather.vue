<template>
  <main>
    <div id="medium-container" v-if="isLoading && !error">
      <TheSpinner />
    </div>
    <BaseCard v-if="!isLoading && error">
      <p>Something ewent wrong...</p>
    </BaseCard>
    <section v-if="!isLoading && !error && weatherData">
      <MainWeather
        :weatherData="weatherData"
        :forecastData="forecastData"
        :cityData="cityData"
      />
      <TheSeparator />
      <TheFilter :currentFilters="filters" @update-filters="updateFilters" />
      <TheBarChart
        :forecastData="forecastDataOfTheDay"
        :dataFilters="filters.dataFilters"
        :dayOfData="dayOfTheFilter"
      />
      <ThePieChart
        :forecastData="forecastDataOfTheDay"
        :dayOfData="dayOfTheFilter"
      />
    </section>
  </main>
</template>

<script>
import MainWeather from "./MainWeather.vue";
import TheBarChart from "./TheBarChart.vue";
import ThePieChart from "./ThePieChart.vue";
import TheFilter from "../filters/TheFilter";
import TheSeparator from "../UI/TheSeparator";

export default {
  props: ["cityData", "weatherData", "forecastData", "isLoading", "error"],
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
    TheSeparator,
  },
  methods: {
    updateFilters(obj) {
      this.filters = obj;
    },
  },
  computed: {
    dayOfTheFilter() {
      let daysToAdd;
      if (this.filters.timeFilters.restOfTheDay) {
        daysToAdd = 0;
      }
      if (this.filters.timeFilters.tomorrow) {
        daysToAdd = 1;
      }
      if (this.filters.timeFilters.theDayAfter) {
        daysToAdd = 2;
      }

      let date = new Date();
      return new Date(date.setDate(date.getDate() + daysToAdd));
    },
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
  width: 100%;
  margin: 2rem 0 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

section {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
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
</style>
