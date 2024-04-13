<template>
  <div>
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
  </div>
</template>

<script>
import { getCityData } from "../..//helpers.js";

import SearchSuggestion from "./SearchSuggestion.vue";

export default {
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
    setSearch() {
      if (this.cityString === "") {
        this.searchEmptyError = true;
        return;
      }

      try {
        const cityFound = getCityData(this.cityString, 1);
        this.cityString = cityFound[0].name;

        if (!this.cityString) return;

        this.$emit(
          "setCoords",
          this.suggestions.find((sugg) => sugg.name === this.cityString)
        );
      } catch {
        this.searchError = true;
        return;
      }

      this.suggestionsAreVisible = false;
    },
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
    setSelectedCity(cityName) {
      this.cityString = cityName;
      this.$emit(
        "setCoords",
        this.suggestions.find((sugg) => sugg.name === cityName)
      );
      this.suggestionsAreVisible = false;
    },
    showSuggestions() {
      this.suggestionsAreVisible = true;
    },
    hideSuggestions() {
      setTimeout(() => {
        this.suggestionsAreVisible = false;
      }, 100);
    },
  },
  computed: {
    visibleSuggestions() {
      return this.suggestionsAreVisible && this.suggestions.length > 0;
    },
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
form {
  width: var(--medium-width);
  background-color: white;
  position: relative;
  border-radius: 3rem;
  height: 2.5rem;
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
  top: 3rem;
  left: 0.3rem;
  right: 0.3rem;
  border-radius: 5px;
}

#context-window {
  background-color: white;
  position: absolute;
  top: 3rem;
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
</style>
