<template>
  <header>
    <div id="header-container">
      <img src="../../assets/logo.png" alt="Logo" />
    </div>
  </header>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: rgb(231, 231, 231);
  box-shadow: 0 0 10px var(--main-black);
  height: 8rem;
  margin-bottom: 1.5rem;
}

div {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80%;
}

img {
  height: 100%;
}
</style>
