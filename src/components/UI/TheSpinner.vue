<template>
  <div>
    <img src="../../assets/spinner.svg" />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

img {
  animation-name: rotate;
  animation-duration: 1s;
  aspect-ratio: 1/1;
  width: 4rem;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0.93, 0.15, 0.24, 0.76);
}
</style>
