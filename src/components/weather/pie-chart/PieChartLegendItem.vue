<template>
  <li :style="{ color: itemColor }">
    <img :src="legendData.image" />
    <p>{{ legendData.description }}</p>
  </li>
</template>

<script>
import { getImage, getColor } from "@/helpers";

/**
 * Elemento della legenda dellaa carta del grafico a torta
 * Riceve:
 * legendItem: Object, informazioni raggruppate sul meteo della giornata selezionata
 */
export default {
  props: ["legendItem"],
  computed: {
    /**
     * formatta i dati da mostrare nell'elemento
     * Utilizza la funzione getImage (vd. helpers.js)
     */
    legendData() {
      return {
        image: getImage(this.legendItem.code),
        description: this.legendItem.description,
      };
    },
    /**
     * Ottiene il colore dell'elemento trmaite getColor (vd. helpers.js)
     */
    itemColor() {
      return getColor(this.legendItem.code);
    },
  },
};
</script>

<style scoped>
li {
  display: flex;
  align-items: center;
  height: 3rem;
  gap: 0.5rem;
}

img {
  height: 100%;
}

p {
  font-weight: 500;
  text-transform: uppercase;
}
</style>
