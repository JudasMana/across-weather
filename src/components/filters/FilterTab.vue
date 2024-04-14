<template>
  <div :class="{ 'tab-active': tabIsActive }" class="tab">
    {{ text }}
  </div>
</template>

<script>
export default {
  props: ["tabIsActive", "text"],
};
</script>

<style>
.tab {
  cursor: pointer;
  background-color: var(--main-white);
  width: 100%;
  height: 2.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1rem;
  border-radius: 5px;
  box-shadow: 0 0 2px rgb(28, 31, 29);
}

@media screen and (min-width: 490px) {
  .tab {
    height: 2rem;
  }
}

@media screen and (min-width: 1400px) {
  .tab {
    height: 2.5rem;
  }
}

.tab:active {
  background-color: rgb(207, 191, 191);
}

.tab-active {
  background-color: var(--main-accent);
  color: white;
  box-shadow: inset 0 0 5px rgb(9, 65, 13);
}
</style>
