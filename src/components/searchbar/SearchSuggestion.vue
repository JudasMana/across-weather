<template>
  <li @click.prevent="sendSignal">
    <div>
      {{ city.name }}<span> {{ city.country }}</span>
    </div>
  </li>
</template>

<script>
export default {
  props: ["city"],
  methods: {
    sendSignal() {
      this.$emit("sendCitySignal", this.city.name);
    },
  },
  emits: ["sendCitySignal"],
};
</script>

<style scoped>
li {
  cursor: pointer;
  padding: 0.5rem 0 0.5rem 1rem;
  font-weight: 500;
}

li + li {
  border-top: 1px solid var(--main-white);
}

li:hover {
  background-color: antiquewhite;
}

span {
  opacity: 0.4;
  margin-left: 0.5rem;
}
</style>
