<template>
  <main class="home">
    <section class="welcome-section">
      <div class="introduction">
        <h1>Welcome to Vividness!</h1>
        <p>Vividness offers creative tools like the AI Color Palette Generator and Color Mixer to inspire your imagination. 
          Discover endless possibilities of color through our service!
        </p>
      </div>
      <div class="img-wrapper">
        <img src="/src/assets/home-background.jpg" alt="Palette Image">
      </div>
    </section>
  </main>
</template>

<script setup>
</script>

<style scoped>
.home {
  display: flex;
  justify-content: center;
}

.welcome-section {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120rem;
  gap: 2rem;
  margin-bottom: 5rem;
}

.introduction {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(50% - 1rem);
}

.introduction h1 {
  font-size: 3.2rem;
  font-weight: 500;
}

.introduction p {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 400;
  line-height: 3rem;
}

.img-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40rem;
  width: calc(50% - 1rem);
  border-radius: 0.8rem;
  overflow: hidden;
}

.img-wrapper img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

@media screen and (max-width: 1366px) {
  .welcome-section {
    width: 82%;
  }

  .img-wrapper {
    height: 32rem;
  }
}

@media screen and (max-width: 900px) {
  .welcome-section {
    flex-direction: column;
  }

  .introduction {
    width: 100%;
  }

  .img-wrapper {
    height: 40rem;
    width: 100%;
  }
}
</style>