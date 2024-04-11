<template>
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

export default {
  components: { TheHeader, TheSearchbar, TheWeather },
  data() {
    return {
      cityData: null,
      weatherData: null,
      forecastData: null,
      fetchError: false,
      fetchLoading: false,
    };
  },
  methods: {
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
    async setWeather() {
      this.weatherData = await getWeatherData(
        this.cityData.lat,
        this.cityData.lon
      );
      // console.log(this.weatherData);

      this.forecastData = await getForecastData(
        this.cityData.lat,
        this.cityData.lon
      );
      // console.log(this.forecastData);
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap");

:root {
  --main-width: 40rem;
  --medium-width: 20rem;
  --main-accent: rgb(40, 121, 96);
  --main-white: rgb(240, 234, 234);
  --main-black: rgba(29, 27, 27, 0.363);

  @media screen and (min-width: 1200px) {
    --main-width: 60rem;
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
  min-height: 100vh;
  overflow-x: hidden;
}

body {
  width: 100%;
  background-color: var(--main-white);
}

#app {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
