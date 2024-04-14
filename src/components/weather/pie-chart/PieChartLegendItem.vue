<template>
  <li :style="{ color: itemColor }">
    <img :src="legendData.image" />
    <p>{{ legendData.description }}</p>
  </li>
</template>

<script>
import { getImage, getColor } from "@/helpers";

export default {
  props: ["legendItem"],
  computed: {
    legendData() {
      return {
        image: getImage(this.legendItem.code),
        description: this.legendItem.description,
      };
    },
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
  margin: 0;
  font-weight: 500;
  text-transform: uppercase;
}
</style>
