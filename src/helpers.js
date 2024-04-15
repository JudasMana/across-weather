import {
  WEATHER_API_KEY,
  WEATHER_API_URL,
  FORECAST_API_URL,
  fuso,
} from "./config.js";
import cities from "cities.json";

import clearImage from "./assets/weather-icons/wi-day-sunny.svg";
import clearImageNight from "./assets/weather-icons/wi-night-clear.svg";
import fewCloudsImage from "./assets/weather-icons/wi-day-cloudy.svg";
import fewCloudsImageNight from "./assets/weather-icons/wi-night-cloudy.svg";
import cloudsImage from "./assets/weather-icons/wi-cloud.svg";
import cloudsImageNight from "./assets/weather-icons/wi-cloud.svg";
import brokenCloudsImage from "./assets/weather-icons/wi-cloudy.svg";
import brokenCloudsImageNight from "./assets/weather-icons/wi-cloudy.svg";
import showerRainImage from "./assets/weather-icons/wi-day-showers.svg";
import showerRainImageNight from "./assets/weather-icons/wi-night-showers.svg";
import rainImage from "./assets/weather-icons/wi-day-rain.svg";
import rainImageNight from "./assets/weather-icons/wi-night-rain.svg";
import stormImage from "./assets/weather-icons/wi-day-storm-showers.svg";
import stormImageNight from "./assets/weather-icons/wi-night-storm-showers.svg";
import snowImage from "./assets/weather-icons/wi-day-snow.svg";
import snowImageNight from "./assets/weather-icons/wi-night-snow.svg";
import mistImage from "./assets/weather-icons/wi-day-fog.svg";
import mistImageNight from "./assets/weather-icons/wi-night-fog.svg";

/**
 * Utilizzando cities (https://github.com/lutangar/cities.json) ricava le città suggerite in base ad una stringa, e ne restituisce un numero scpecificabile.
 * Riceve:
 * cityString: string, la stringa da mathcare per ricavaaare le città suggerite
 * limit: int, numero di suggerimenti daa reituire
 *
 * Restituisce:
 * array i cui elementi sono dati sulle città
 *
 * Effettua un sorting in base all'oridne aalfabetico, dando priorità alle città che presentano la stringa passata all'inizio del nome
 */
export const getCityData = function (cityString, limit) {
  const matchedCities = cities
    .filter((city) => {
      return city.name.toLowerCase().includes(cityString.toLowerCase());
    })
    .map((city) => {
      return {
        name: city.name,
        country: city.country,
        lat: city.lat,
        lon: city.lng,
      };
    })
    .sort((city1, city2) => {
      const city1StartsWith =
        city1.name.slice(0, cityString.length).toLowerCase() ===
        cityString.toLowerCase();
      const city2StartsWith =
        city2.name.slice(0, cityString.length).toLowerCase() ===
        cityString.toLowerCase();
      if (city1StartsWith && !city2StartsWith) {
        return -1;
      }
      if (!city1StartsWith && city2StartsWith) {
        return 1;
      }
      if (city1.name < city2.name) {
        return -1;
      }
      if (city1.name > city2.name) {
        return 1;
      }
      return 0;
    });

  if (matchedCities.length < limit) {
    return matchedCities;
  }

  return matchedCities.slice(0, limit);
};

/**
 * Funzione che chiama le API (https://openweathermap.org/current)
 * Riceve:
 * lat: float, latitudine del luogo di cui cercare il meteo attuale
 * lon: float, longitudine del luogo di cui cercare il meteo attuale
 *
 * Restituisce:
 * oggetto con i dati del meteo attuale nelle coordinate passate
 *
 * In caso di errore fa un throw di un Error generico
 */
export const getWeatherData = async function (lat, lon) {
  const url = `${WEATHER_API_URL}lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error();
  }

  return await res.json();
};

/**
 * Funzione che chiama le API (https://openweathermap.org/forecast5)
 * Riceve:
 * lat: float, latitudine del luogo di cui cercare le previsioni meteo
 * lon: float, longitudine del luogo di cui cercare le previsioni meteo
 *
 * Restituisce:
 * oggetto con i dati delle previsioni meteo nelle coordinate passate
 *
 * In caso di errore fa un throw di un Error generico
 */
export const getForecastData = async function (lat, lon) {
  const url = `${FORECAST_API_URL}lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error();
  }
  return await res.json();
};

/**
 * Formatta i dati delle previsionio meteo e resituisce un array più facilmente lavorabile.
 * Riceve:
 * forecasts: oggetto con le preivisoni meteo
 * type: tipo di formattazione che va effettuata (nel caso di tipo minMaxTemp verranno resituiti solo i dati relativi agli orari di cui si possiedono dati)
 *
 * Restituisce:
 * Array i cui elementi sono oggetti del tipo {date: string, indicaa l'orario del dato, value: valore del dato in quell'orario, icon: codice del meteo in quell'orario}
 */
export const fillForecasts = function (forecasts, type = "mainTemp") {
  const actualForecast = forecasts.map((fore) => {
    let mappedValue;
    if (type === "mainTemp") {
      mappedValue = fore.main.temp - 273.15;
    } else if (type === "minMaxTemp") {
      mappedValue = [fore.main.temp_min - 273.15, fore.main.temp_max - 273.15];
    } else if (type === "humidity") {
      mappedValue = fore.main.humidity;
    } else if (type === "wind") {
      mappedValue = fore.wind.speed;
    }

    return {
      date: `${new Date(fore.dt_txt).getHours() + fuso}:00`,
      value: mappedValue,
      icon: fore.weather[0]?.icon ?? "01d",
    };
  });

  if (type === "minMaxTemp") {
    return actualForecast;
  }

  // orari nei quali serve il dato
  const allTimes = [
    `${0 + fuso}:00`,
    `${3 + fuso}:00`,
    `${6 + fuso}:00`,
    `${9 + fuso}:00`,
    `${12 + fuso}:00`,
    `${15 + fuso}:00`,
    `${18 + fuso}:00`,
    `${21 + fuso}:00`,
  ];

  // Filla con 0 i dati negli orari nei quali non si ha il dato
  return allTimes.map((time) => {
    const forecastAtThatTime = actualForecast.find((fore) => {
      return fore.date === time;
    });
    if (forecastAtThatTime) {
      return {
        date: time,
        value: forecastAtThatTime.value,
        icon: forecastAtThatTime.icon,
      };
    } else {
      return {
        date: time,
        value: 0,
        icon: null,
      };
    }
  });
};

/**
 * Restituisce un immagine in basae al codice passato.
 * Riceve:
 * code: string, indica il codice del meteo
 */
export const getImage = function (code) {
  if (!code) {
    return null;
  }

  let image;
  const dayPeriod = code.slice(-1) === "d" ? "day" : "night";
  const imageCode = code.slice(0, 2);

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
      image = dayPeriod === "day" ? brokenCloudsImage : brokenCloudsImageNight;
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
      image = null;
      break;
  }
  return image;
};

/**
 * Restituisce un codice rgb in basae al codice passato.
 * Riceve:
 * code: string, indica il codice del meteo
 */
export const getColor = function (code) {
  let colorCode;
  const imageCode = code.slice(0, 2);

  switch (imageCode) {
    case "01":
      colorCode = "rgb(249, 191, 59)";
      break;
    case "02":
      colorCode = "rgb(251, 192, 147)";
      break;
    case "03":
      colorCode = "rgb(189, 195, 199)";
      break;
    case "04":
      colorCode = "rgb(108, 122, 137)";
      break;
    case "09":
      colorCode = "rgb(11, 127, 171)";
      break;
    case "10":
      colorCode = "rgb(3, 138, 255)";
      break;
    case "11":
      colorCode = "rgb(43, 44, 170)";
      break;
    case "13":
      colorCode = "rgb(198, 234, 227)";
      break;
    case "50":
      colorCode = "rgb(213, 184, 255)";
      break;

    default:
      colorCode = "rgb(0, 0, 0)";
      break;
  }

  return colorCode;
};
