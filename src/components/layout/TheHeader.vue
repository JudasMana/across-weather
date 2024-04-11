<template>
  <header>
    <div id="header-container">
      <img src="favicon.ico" alt="Logo" />
      <p>Across Weather</p>
    </div>
  </header>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: var(--main-accent);
  box-shadow: 0 0 10px var(--main-black);
  height: 6rem;
  margin-bottom: 1.5rem;
}

div {
  display: flex;
  align-items: center;
  justify-content: start;
  width: var(--main-width);
  height: 4.5rem;
}

img {
  height: 100%;
  margin-right: 2rem;
  border-radius: 50%;
  border: 3px solid var(--main-white);
}

p {
  font-size: 2rem;
  color: var(--main-white);
  font-weight: 500;
}
</style>
