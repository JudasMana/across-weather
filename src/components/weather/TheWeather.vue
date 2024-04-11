<template>
  <section>
    <div id="medium-container" v-if="isLoading && !error">
      <TheSpinner />
    </div>
    <BaseCard v-if="!isLoading && error">
      <p>Something ewent wrong...</p>
    </BaseCard>
    <div id="main-weather" v-if="!isLoading && !error">
      <BaseCard v-if="weatherData">
        <p>City: {{ cityData.name }}</p>
        <p>Country: {{ cityData.country }}</p>
        <p>Temperature: {{ weatherData.main.temp }}</p>
        <p>Weather: {{ weatherData.weather[0].main }}</p>
      </BaseCard>
    </div>
  </section>
</template>

<script>
export default {
  props: ["cityData", "weatherData", "forecastData", "isLoading", "error"],
};
</script>

<style scoped>
section {
  width: var(--main-width);
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
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
