<template>
  <div>
    <slot name="default"></slot>
  </div>
</template>

<script>
/**
 * Componente base di styling per le carte presenti nell'applicaazione
 */
export default {};
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  background-color: rgb(255, 253, 253);
  height: 100%;
  border-radius: 10px;
  box-shadow: 0 0 10px var(--main-black);
  padding: 1rem;
  margin: 1rem 0;
  transition: transform 1s, opacity 1s;
}
</style>
