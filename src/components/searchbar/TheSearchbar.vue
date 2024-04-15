<template>
  <section>
    <form @submit.prevent="setSearch">
      <input
        type="text"
        v-model.trim="cityString"
        @input="getCities"
        @focus="showSuggestions"
        @blur="hideSuggestions"
        placeholder="Search for a city..."
        :class="{ 'invalid-input': searchError || searchEmptyError }"
      />
      <button>
        <img src="../../assets/search.svg" />
      </button>
      <ul v-if="visibleSuggestions">
        <SearchSuggestion
          v-for="sugg in suggestions"
          :key="`${sugg.name}${sugg.lat}${sugg.lon}`"
          :city="sugg"
          @sendCitySignal="setSelectedCity"
        />
      </ul>
      <div id="context-window" v-if="noResults">No results found</div>
      <p class="error-message" v-if="searchEmptyError">Search a city name</p>
      <p class="error-message" v-if="searchError">No cities found</p>
    </form>
  </section>
</template>

<script>
import { getCityData } from "../../helpers.js";

import SearchSuggestion from "./SearchSuggestion.vue";

/**
 * Barra di ricerca
 */
export default {
  /**
   * cityString: valore indicato nell'input (collegato con v-model)
   * suggestions: elenco città suggerite
   * suggestionAreVisible: bool, indica se i suggerimenti saranno visibili o meno (diverso dal computed visibleSuggestions che effetivamente gestisce la visibilità del menù suggerimenti)
   * searchEmptyError: indica se si è ricercato con la barra di ricerca vuota
   * searchError: indica se si è ricercato senza alcun suggerimento disponibile
   */
  data() {
    return {
      cityString: "",
      suggestions: [],
      suggestionsAreVisible: false,
      searchEmptyError: false,
      searchError: false,
    };
  },
  methods: {
    /**
     * Funzione lanciata al submit del form
     * Emette l'evento custom setCoords con i dati della città selezionata
     * Viene selezionata la prima città tra i suggerimenti disponibili
     * Se la barra di ricerca è vuota viene reso vero il searchEmptyError
     * Se non ci sono suggerimenti viene reso vero il searchError
     * Vengono nascosti i suggerimenti
     */
    setSearch() {
      if (this.cityString === "") {
        this.searchEmptyError = true;
        return;
      }

      const cityFound = getCityData(this.cityString, 1);

      if (cityFound.length === 0) {
        this.searchError = true;
        return;
      }

      this.cityString = cityFound[0].name;

      this.$emit(
        "setCoords",
        this.suggestions.find((sugg) => sugg.name === this.cityString)
      );

      this.suggestionsAreVisible = false;
    },
    /**
     * Funzione lanciata in @input sulla barra di ricerca
     * Imposta suggestion con il risultato di getCityData (vd. helpers.js)
     */
    getCities() {
      this.searchEmptyError = false;
      this.searchError = false;

      if (this.cityString === "") {
        this.suggestions = [];
        return;
      }

      this.suggestions = getCityData(this.cityString, 10);

      if (this.cityString === "") {
        this.suggestions = [];
      }
    },
    /**
     * Funziona lanciata su un click su un suggerimento
     * Emette l'evento custom setCoords con i dati della città cliccata
     * Nasconde i suggerimenti
     */
    setSelectedCity(cityName) {
      this.cityString = cityName;
      this.$emit(
        "setCoords",
        this.suggestions.find((sugg) => sugg.name === cityName)
      );
      this.suggestionsAreVisible = false;
    },
    /**
     * Nasconde i suggerimenti
     */
    showSuggestions() {
      this.suggestionsAreVisible = true;
    },
    /**
     * Nasconde i suggerimenti sul @blur dellaa barra di ricerca
     * Use un setTimeout per poter rendere cliccabili i suggerimenti
     */
    hideSuggestions() {
      setTimeout(() => {
        this.suggestionsAreVisible = false;
      }, 100);
    },
  },
  computed: {
    /**
     * Calcola la varibile che mostra o meno il menù suiggerimenti
     */
    visibleSuggestions() {
      return this.suggestionsAreVisible && this.suggestions.length > 0;
    },
    /**
     * Calcola la variaabile che mostra il menù di errore per assenza suggerimenti
     */
    noResults() {
      return (
        this.suggestionsAreVisible &&
        this.suggestions.length === 0 &&
        this.cityString !== "" &&
        !this.searchError
      );
    },
  },
  emits: ["setCoords"],
  components: { SearchSuggestion },
};
</script>

<style scoped>
section {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

form {
  width: 70%;
  background-color: white;
  position: relative;
  border-radius: 3rem;
  height: 4rem;
}

input {
  width: 100%;
  height: 100%;
  border-radius: 3rem;
  border: none;
  padding-left: 1rem;
  font-weight: 500;
  caret-color: rgb(212, 190, 190);
  font-size: 1.1rem;
}

input::placeholder {
  opacity: 0.5;
}

input:focus {
  outline: 2px solid rgb(212, 190, 190);
}

.invalid-input {
  border: 2px solid rgba(226, 7, 43, 0.733);
}

button {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgb(212, 190, 190);
  border: none;
  border-radius: 50%;
  aspect-ratio: 1/1;
  transform: scale(1.15);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

button:hover {
  background-color: rgb(184, 163, 163);
  box-shadow: 0 0 3px rgba(97, 85, 85, 0.521);
}

img {
  width: 1.3rem;
  filter: invert(1);
}

ul {
  list-style: none;
  background-color: white;
  border: 1px solid rgb(209, 184, 184);
  position: absolute;
  top: 4.5rem;
  left: 0.3rem;
  right: 0.3rem;
  border-radius: 5px;
}

#context-window {
  background-color: white;
  position: absolute;
  top: 4.5rem;
  left: 0.3rem;
  right: 0.3rem;
  border-radius: 5px;
  height: 15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgb(209, 184, 184);
}

.error-message {
  color: rgba(226, 7, 43, 0.733);
  position: absolute;
  top: 2.5rem;
  left: 0.8rem;
  font-size: 1rem;
  font-style: italic;
}

@media screen and (min-width: 490px) {
  form {
    width: var(--medium-width);
    height: 2.5rem;
  }

  ul {
    top: 3rem;
  }

  #context-window {
    top: 3rem;
  }
}
</style>
