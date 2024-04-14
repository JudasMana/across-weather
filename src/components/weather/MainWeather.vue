<template>
  <BaseCard :class="{ hidden: !showCard }">
    <div id="country-info">
      <h2 id="city">{{ cityData.name }}</h2>
      <p id="country">{{ cityData.country }}</p>
    </div>
    <div id="weather">
      <div id="temperature-info">
        <p id="temperature">
          {{ mainTemperature }}
          °C
        </p>
        <p id="temperature-perceived">
          <span id="perc">Perceived: </span>{{ perceivedTemperature }}
          °C
        </p>
      </div>
      <div id="weather-info">
        <img :src="weatherIconPath" alt="Weather Icon" />
      </div>
    </div>
  </BaseCard>
  <TheSeparator :class="{ hidden: !showCard }" />
</template>

<script>
import { getImage } from "@/helpers";
import TheSeparator from "../UI/TheSeparator";

export default {
  data() {
    return {
      showCard: false,
    };
  },
  components: { TheSeparator },
  props: ["weatherData", "cityData", "forecastData"],
  computed: {
    mainTemperature() {
      if (!this.weatherData.main.temp) {
        return "No Data";
      }
      return (this.weatherData.main.temp - 273.15).toFixed(1);
    },
    perceivedTemperature() {
      if (!this.weatherData.main.feels_like) {
        return "No Data";
      }
      return (this.weatherData.main.feels_like - 273.15).toFixed(1);
    },
    weatherIconPath() {
      return getImage(this.weatherData.weather[0]?.icon);
    },
  },
  mounted() {
    this.showCard = true;
  },
};
</script>

<style scoped>
#country-info {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 0.6rem;
  margin-bottom: 2rem;
}

#city {
  font-weight: 800;
  font-size: 2rem;
}

#country {
  color: grey;
}

#temperature-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

#weather {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

#temperature {
  font-weight: 600;
  font-size: 1.7rem;
  color: rgb(58, 51, 51);
}

#temperature-perceived {
  font-style: italic;
}

#weather-info {
  aspect-ratio: 1/1;
  width: 6rem;
}

#weather-info img {
  width: 100%;
}
</style>
