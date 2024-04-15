import { fuso } from "../src//config";
import { describe, it, expect } from "vitest";

import {
  getCityData,
  getWeatherData,
  getForecastData,
  fillForecasts,
  getColor,
  getImage,
} from "../src/helpers";

describe("getWeatherData", () => {
  it("should throw if wrong coordinates", async () => {
    await expect(getWeatherData(4500, 4500)).rejects.toThrowError(
      "Failed to fetch"
    );
    await expect(getWeatherData(4500, "")).rejects.toThrowError(
      "Failed to fetch"
    );
  });

  it("should return weather data", async () => {
    expect(await getWeatherData(45, 45)).toBeTypeOf("object");
    expect(await getWeatherData(45, 45)).toHaveProperty("main");
  });
});

describe("getForecastData", () => {
  it("should throw if wrong coordinates", async () => {
    await expect(getForecastData(4500, 4500)).rejects.toThrowError(
      "Failed to fetch"
    );
    await expect(getForecastData(4500, "")).rejects.toThrowError(
      "Failed to fetch"
    );
  });

  it("should return forecast data", async () => {
    expect(await getForecastData(45, 45)).toBeTypeOf("object");
    expect(await getForecastData(45, 45)).toHaveProperty("list");
  });

  it("should return forecast data for the next 40 3-hours", async () => {
    expect((await getForecastData(45, 45)).list).toHaveLength(40);
  });
});

describe("fillForecasts", () => {
  it("should throw if a wrong type is passsed", async () => {
    const forecastData = await getForecastData(45, 45);
    expect(() => {
      fillForecasts(forecastData.list, "testArg");
    }).toThrowError(
      "Specify a type between: 'mainTemp', 'minMaxTemp', 'humidity', 'wind'"
    );
  });

  it("should return an object", async () => {
    const forecastData = await getForecastData(45, 45);
    expect(fillForecasts(forecastData.list.slice(0, 4))).toBeTypeOf("object");
  });

  it("should return the correct object (type is not minMaxTemp)", async () => {
    const forecastData = await getForecastData(45, 45);
    expect(fillForecasts(forecastData.list, "wind").slice(0, 8)).toEqual([
      expect.objectContaining({
        date: `${0 + fuso}:00`,
        icon: expect.any(String),
        value: expect.any(Number),
      }),
      expect.objectContaining({
        date: `${3 + fuso}:00`,
        icon: expect.any(String),
        value: expect.any(Number),
      }),
      expect.objectContaining({
        date: `${6 + fuso}:00`,
        icon: expect.any(String),
        value: expect.any(Number),
      }),
      expect.objectContaining({
        date: `${9 + fuso}:00`,
        icon: expect.any(String),
        value: expect.any(Number),
      }),
      expect.objectContaining({
        date: `${12 + fuso}:00`,
        icon: expect.any(String),
        value: expect.any(Number),
      }),
      expect.objectContaining({
        date: `${15 + fuso}:00`,
        icon: expect.any(String),
        value: expect.any(Number),
      }),
      expect.objectContaining({
        date: `${18 + fuso}:00`,
        icon: expect.any(String),
        value: expect.any(Number),
      }),
      expect.objectContaining({
        date: `${21 + fuso}:00`,
        icon: expect.any(String),
        value: expect.any(Number),
      }),
    ]);
  });
});

describe("getCityData", () => {
  it("should return empty array if limit is 0", () => {
    expect(getCityData("tur", 0)).toStrictEqual([]);
  });

  it("should return an object of the correct type", () => {
    expect(getCityData("tur", 1)).toEqual([
      expect.objectContaining({
        name: expect.any(String),
        lat: expect.any(String),
        lon: expect.any(String),
        country: expect.any(String),
      }),
    ]);
  });

  it("should return an array as long as limit", () => {
    expect(getCityData("tur", 7)).toHaveLength(7);
  });
});

describe("getImage", () => {
  it("should return undefined if passed something that is not a string", () => {
    expect(getImage(3)).toBeUndefined();
  });

  it("should return undefined if passed nothing", () => {
    expect(getImage()).toBeUndefined();
  });

  it("should return null if the wrong code is passed", () => {
    expect(getImage("aaaa")).toBeNull();
  });

  it("should return null if a code shorter than 2 characters is passed", () => {
    expect(getImage("a")).toBeNull();
  });

  it("should return the correct path if passed the correct code", () => {
    expect(getImage("01d")).toBe("/src/assets/weather-icons/wi-day-sunny.svg");
    expect(getImage("01n")).toBe(
      "/src/assets/weather-icons/wi-night-clear.svg"
    );
    expect(getImage("02d")).toBe("/src/assets/weather-icons/wi-day-cloudy.svg");
    expect(getImage("02n")).toBe(
      "/src/assets/weather-icons/wi-night-cloudy.svg"
    );
    expect(getImage("03d")).toBe("/src/assets/weather-icons/wi-cloud.svg");
    expect(getImage("03n")).toBe("/src/assets/weather-icons/wi-cloud.svg");
    expect(getImage("04d")).toBe("/src/assets/weather-icons/wi-cloudy.svg");
    expect(getImage("04n")).toBe("/src/assets/weather-icons/wi-cloudy.svg");
    expect(getImage("09d")).toBe(
      "/src/assets/weather-icons/wi-day-showers.svg"
    );
    expect(getImage("09n")).toBe(
      "/src/assets/weather-icons/wi-night-showers.svg"
    );
    expect(getImage("10d")).toBe("/src/assets/weather-icons/wi-day-rain.svg");
    expect(getImage("10n")).toBe("/src/assets/weather-icons/wi-night-rain.svg");
    expect(getImage("11d")).toBe(
      "/src/assets/weather-icons/wi-day-storm-showers.svg"
    );
    expect(getImage("11n")).toBe(
      "/src/assets/weather-icons/wi-night-storm-showers.svg"
    );
    expect(getImage("13d")).toBe("/src/assets/weather-icons/wi-day-snow.svg");
    expect(getImage("13n")).toBe("/src/assets/weather-icons/wi-night-snow.svg");
    expect(getImage("50d")).toBe("/src/assets/weather-icons/wi-day-fog.svg");
    expect(getImage("50n")).toBe("/src/assets/weather-icons/wi-night-fog.svg");
  });
});

describe("getColor", () => {
  it("should return undefined if passed something that is not a string", () => {
    expect(getColor(3)).toBeUndefined();
  });

  it("should return null if the code is shorter than 2 characters", () => {
    expect(getColor("0")).toBeNull();
  });

  it("should return black with a wrong code", () => {
    expect(getColor("aaaa")).toBe("rgb(0, 0, 0)");
  });

  it("should return the correct color with the correct code", () => {
    expect(getColor("01")).toBe("rgb(249, 191, 59)");
    expect(getColor("02")).toBe("rgb(251, 192, 147)");
    expect(getColor("03")).toBe("rgb(189, 195, 199)");
    expect(getColor("04")).toBe("rgb(108, 122, 137)");
    expect(getColor("09")).toBe("rgb(11, 127, 171)");
    expect(getColor("10")).toBe("rgb(3, 138, 255)");
    expect(getColor("11")).toBe("rgb(43, 44, 170)");
    expect(getColor("13")).toBe("rgb(198, 234, 227)");
    expect(getColor("50")).toBe("rgb(213, 184, 255)");
  });
});
