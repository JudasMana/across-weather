<template>
  <BaseCard>
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
</template>

<script>
import clearImage from "../../../public/wheater-icons/wi-day-sunny.svg";
import clearImageNight from "../../../public/wheater-icons/wi-night-clear.svg";
import fewCloudsImage from "../../../public/wheater-icons/wi-day-cloudy.svg";
import fewCloudsImageNight from "../../../public/wheater-icons/wi-night-cloudy.svg";
import cloudsImage from "../../../public/wheater-icons/wi-cloud.svg";
import cloudsImageNight from "../../../public/wheater-icons/wi-cloud.svg";
import brokenCloudsImage from "../../../public/wheater-icons/wi-cloudy.svg";
import brokenCloudsImageNight from "../../../public/wheater-icons/wi-cloudy.svg";
import showerRainImage from "../../../public/wheater-icons/wi-day-showers.svg";
import showerRainImageNight from "../../../public/wheater-icons/wi-night-showers.svg";
import rainImage from "../../../public/wheater-icons/wi-day-rain.svg";
import rainImageNight from "../../../public/wheater-icons/wi-night-rain.svg";
import stormImage from "../../../public/wheater-icons/wi-day-storm-showers.svg";
import stormImageNight from "../../../public/wheater-icons/wi-night-storm-showers.svg";
import snowImage from "../../../public/wheater-icons/wi-day-snow.svg";
import snowImageNight from "../../../public/wheater-icons/wi-night-snow.svg";
import mistImage from "../../../public/wheater-icons/wi-day-fog.svg";
import mistImageNight from "../../../public/wheater-icons/wi-night-fog.svg";

export default {
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
      let image;
      let dayPeriod;
      let imageCode;
      if (this.weatherData.weather.length === 0) {
        dayPeriod = "night";
        imageCode = "00";
      } else {
        dayPeriod =
          this.weatherData.weather[0]?.icon.slice(-1) === "d" ? "day" : "night";
        imageCode = this.weatherData.weather[0]?.icon.slice(0, 2);
      }

      switch (imageCode) {
        case "01":
          image = dayPeriod === "day" ? clearImage : clearImageNight;
          break;
        case "02":
          image = dayPeriod === "day" ? fewCloudsImage : fewCloudsImageNight;
          break;
        case "03":
          image = dayPeriod === "day" ? cloudsImage : cloudsImageNight;
          break;
        case "04":
          image =
            dayPeriod === "day" ? brokenCloudsImage : brokenCloudsImageNight;
          break;
        case "09":
          image = dayPeriod === "day" ? showerRainImage : showerRainImageNight;
          break;
        case "10":
          image = dayPeriod === "day" ? rainImage : rainImageNight;
          break;
        case "11":
          image = dayPeriod === "day" ? stormImage : stormImageNight;
          break;
        case "13":
          image = dayPeriod === "day" ? snowImage : snowImageNight;
          break;
        case "50":
          image = dayPeriod === "day" ? mistImage : mistImageNight;
          break;

        default:
          image = dayPeriod === "day" ? clearImage : clearImageNight;
          break;
      }
      return image;
    },
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
