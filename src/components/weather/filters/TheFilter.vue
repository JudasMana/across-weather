<template>
  <BaseCard :class="{ hidden: !showCard }">
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
import { showCardTransitionTime } from "@/config";
import FilterTab from "./FilterTab.vue";

/**
 * Carta con i filtri
 * Riceve:
 * currentFilters: Object, dati sui filtri attivi nella pagina
 */
export default {
  /**
   * showCard: bool, indica se la carta è visibile o meno (per far funzionare l'animazione). Se vera toglie la calsse hidden dalla componente
   */
  data() {
    return {
      showCard: false,
    };
  },
  /**
   * filterTab: bottone dei filtri
   */
  components: { FilterTab },
  props: ["currentFilters"],
  methods: {
    /**
     * funzione che crea un evento custom per aggiornare i dati relativi ai filtri.
     * Riceve:
     * key: string, indica quale tasto dei filtri è stato cliccato
     * diasabled: bool, se vero i filtri non vengono aggiornati
     *
     * Emette l'evento update-filters con l'oggetto che andrà a sostituira l'oggetto filtri attuale nellaa componente TheWeaather
     */
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
  /**
   * Gestisce l'animazione al mount della componente
   */
  mounted() {
    setTimeout(() => {
      this.showCard = true;
    }, showCardTransitionTime);
  },
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

@media screen and (min-width: 1400px) {
  section {
    height: 100%;
  }

  .filters {
    width: 35%;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    align-items: center;
  }
}
</style>
