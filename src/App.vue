<template>
  <TheStartScreen v-if="showStartScreen" />
  <TheHeader />
  <TheSearchbar @setCoords="setCityData" />
  <TheWeather
    :cityData="cityData"
    :weatherData="weatherData"
    :forecastData="forecastData"
    :isLoading="fetchLoading"
    :error="fetchError"
  />
</template>

<script>
import { getWeatherData, getForecastData } from "./helpers.js";

import TheHeader from "./components/layout/TheHeader";
import TheSearchbar from "./components/searchbar/TheSearchbar.vue";
import TheWeather from "./components/weather/TheWeather";
import TheStartScreen from "./components/layout/TheStartScreen.vue";

/**
 * Componente base dell'applicazione
 */
export default {
  components: { TheHeader, TheSearchbar, TheWeather, TheStartScreen },
  /**
   * cityData: Object, informazioni sulla città selezionata
   * weatherData: Object, informazioni sul meteo attuale nelle coordinate della città selezionata, ricavate dall'API
   * forecastData: Object, informazioni sulle previsioni meteo nelle coordinate della città selezionata, ricavate dall'API
   * fetchError: bool, indica un errore durante il fetch dall'API
   * fetchLoading: bool, indica che il fetch dall'API è in corso
   * showStartScreen: bool, gestisce la visiblità della schermata inziale
   */
  data() {
    return {
      cityData: null,
      weatherData: null,
      forecastData: null,
      fetchError: false,
      fetchLoading: false,
      showStartScreen: true,
    };
  },
  methods: {
    /**
     * Viene lanciata dopo l'evento custom setCoords, riceve un Object on i dati sulla città selezionata (tra cui le coordinate).
     * Aggionrna cityData e chiama setWeather. Gestisce lo statao di loaading e di errore
     */
    async setCityData(cityData) {
      this.weatherData = null;
      this.forecastData = null;
      this.cityData = cityData;

      this.fetchLoading = true;
      this.fetchError = false;

      try {
        await this.setWeather();
      } catch {
        this.fetchError = true;
      }

      this.fetchLoading = false;
    },
    /**
     * Setta weatherData e forecastData chiamanado le API del meteo
     */
    async setWeather() {
      this.weatherData = await getWeatherData(
        this.cityData.lat,
        this.cityData.lon
      );

      this.forecastData = await getForecastData(
        this.cityData.lat,
        this.cityData.lon
      );
    },
  },
  /**
   * Gestisce la visiblità della schermata inziale
   */
  mounted() {
    setTimeout(() => {
      this.showStartScreen = false;
    }, 4000);
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap");

:root {
  --main-width: 95%;
  --medium-width: 20rem;
  --main-accent: rgb(40, 121, 96);
  --main-white: rgb(240, 234, 234);
  --main-black: rgba(29, 27, 27, 0.363);
  font-size: 3vw;
}

@media screen and (min-width: 490px) {
  :root {
    --main-width: 36rem;
    font-size: 13px;
  }
}

@media screen and (min-width: 768px) {
  :root {
    --main-width: 40rem;
    font-size: 14px;
  }
}

@media screen and (min-width: 1200px) {
  :root {
    --main-width: 50rem;
    font-size: 15px;
  }
}

@media screen and (min-width: 1400px) {
  :root {
    --main-width: 55rem;
    font-size: 16px;
  }
}

* {
  font-family: "Rubik", sans-serif;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html {
  width: 100vw;
  overflow-x: hidden;
}

body {
  width: 100%;
  background-color: var(--main-white);
}

#app {
  width: 100%;
  height: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hidden {
  transform: translateY(5rem);
  opacity: 0;
}
</style>
