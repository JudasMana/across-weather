<template>
  <BaseCard>
    <section>
      <div class="filters">
        <p class="filters-label">Time filters</p>
        <FilterTab
          text="Rest of the Day"
          :tabIsActive="currentFilters.timeFilters.restOfTheDay"
          @click="updateFilters('restOfTheDay')"
        />
        <FilterTab
          text="Tomorrow"
          :tabIsActive="currentFilters.timeFilters.tomorrow"
          @click="
            updateFilters('tomorrow', currentFilters.dataFilters.minMaxTemp)
          "
          :class="{ 'tab-disabled': currentFilters.dataFilters.minMaxTemp }"
        />
        <FilterTab
          text="The day after tomorrow"
          :tabIsActive="currentFilters.timeFilters.theDayAfter"
          @click="
            updateFilters('theDayAfter', currentFilters.dataFilters.minMaxTemp)
          "
          :class="{ 'tab-disabled': currentFilters.dataFilters.minMaxTemp }"
        />
      </div>
      <div class="filters">
        <p class="filters-label">Data filters</p>
        <FilterTab
          text="Temperature"
          :tabIsActive="currentFilters.dataFilters.mainTemp"
          @click="updateFilters('mainTemp')"
        />
        <FilterTab
          text="Min/Max Temperature"
          :tabIsActive="currentFilters.dataFilters.minMaxTemp"
          @click="
            updateFilters(
              'minMaxTemp',
              !currentFilters.timeFilters.restOfTheDay
            )
          "
          :class="{ 'tab-disabled': !currentFilters.timeFilters.restOfTheDay }"
        />
        <FilterTab
          text="Humidity"
          :tabIsActive="currentFilters.dataFilters.humidity"
          @click="updateFilters('humidity')"
        />
        <FilterTab
          text="Wind"
          :tabIsActive="currentFilters.dataFilters.wind"
          @click="updateFilters('wind')"
        />
      </div>
    </section>
  </BaseCard>
</template>

<script>
import FilterTab from "./FilterTab.vue";

export default {
  components: { FilterTab },
  props: ["currentFilters"],
  methods: {
    updateFilters(key, disabled = false) {
      if (disabled) return;
      if (["restOfTheDay", "tomorrow", "theDayAfter"].includes(key)) {
        const targetObject = {
          dataFilters: { ...this.currentFilters.dataFilters },
          timeFilters: {
            restOfTheDay: false,
            tomorrow: false,
            theDayAfter: false,
          },
        };
        targetObject.timeFilters[key] = !targetObject.timeFilters[key];
        this.$emit("update-filters", targetObject);
      } else {
        const targetObject = {
          timeFilters: { ...this.currentFilters.timeFilters },
          dataFilters: {
            mainTemp: false,
            minMaxTemp: false,
            humidity: false,
            wind: false,
          },
        };
        targetObject.dataFilters[key] = !targetObject.dataFilters[key];
        this.$emit("update-filters", targetObject);
      }
    },
  },
  emits: ["update-filters"],
};
</script>

<style scoped>
section {
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: space-around;
}

.filters {
  display: flex;
  flex-direction: column;
  width: 30%;
  gap: 0.3rem;
  align-items: center;
}

.filters-label {
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0.5rem 0;
  border-bottom: 1px solid var(--main-black);
  width: 10rem;
  text-align: center;
}

.tab-disabled {
  cursor: not-allowed;
  background-color: rgb(160, 144, 144);
}
</style>
