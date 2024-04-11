import {
  CITY_API_URL,
  CITY_API_KEY,
  WEATHER_API_KEY,
  WEATHER_API_URL,
  FORECAST_API_URL,
} from "./config.js";

export const getCityData = async function (cityString, limit) {
  const res = await fetch(`${CITY_API_URL}${cityString}&limit=${limit}`, {
    headers: { "X-Api-Key": CITY_API_KEY },
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();

  return data.map((city) => {
    return {
      name: city.name,
      country: city.country,
      lat: city.latitude,
      lon: city.longitude,
    };
  });
};

export const getWeatherData = async function (lat, lon) {
  const url = `${WEATHER_API_URL}lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error();
  }

  return await res.json();
};

export const getForecastData = async function (lat, lon) {
  const url = `${FORECAST_API_URL}lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error();
  }
  return await res.json();
};
