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

export default {
  components: { TheHeader, TheSearchbar, TheWeather, TheStartScreen },
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
      console.log(this.forecastData);
    },
  },
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
