<template>
  <div :style="{ opacity: bgOpacity }">
    <img
      src="../../assets/logo.png"
      alt="logo"
      :style="{ opacity: imgOpacity, transform: logoYMove }"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgOpacity: 0,
      bgOpacity: 1,
      logoYMove: 0,
    };
  },
  mounted() {
    setTimeout(() => {
      this.imgOpacity = 1;
    }, 500);

    setTimeout(() => {
      this.imgOpacity = 0;
      this.logoYMove = "translateY(-30rem) scale(0.5)";
    }, 2500);

    setTimeout(() => {
      this.bgOpacity = 0;
    }, 2500);
  },
};
</script>
<style scoped>
div {
  position: fixed;
  inset: 0;
  background-color: var(--main-white);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 2s;
}

img {
  width: 15rem;
  transition: opacity 3s, transform 2.2s;
}

@media screen and (min-width: 490px) {
  img {
    transition: opacity 3s, transform 1.7s;
  }
}

@media screen and (min-width: 1200px) {
  img {
    transition: opacity 2.7s, transform 2.2s;
  }
}
</style>
