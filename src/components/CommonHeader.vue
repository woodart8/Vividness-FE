<template>
  <header class="common-header">
    <div class="logo-wrapper" @click="goHome">
      <div class="logo-icon">
        <img src="/src/assets/logo.svg" alt="Logo Icon">
      </div>
      <span class="logo-text">Vividness</span>
    </div>
    <nav class="menu-nav">
      <ul class="menu-list">
        <li class="menu" @click="goHome">
          <span class="menu-text">Palette Generator</span>
          <i class="fa-solid fa-palette"></i>
        </li>
        <li class="menu" @click="goPopularHex">
          <span class="menu-text">Popular Hex</span>
          <i class="fa-solid fa-fire"></i>
        </li>
      </ul>
      <a href="https://github.com/woodart8" target="_blank" class="github-link">
        <i class="fa-brands fa-square-github"></i>
      </a>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
  router.push('/');
}

const goPopularHex = () => {
  router.push('/popular');
}
</script>

<style scoped>
.common-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10rem;
  padding: 0rem 3rem;
  box-sizing: border-box;
}

.logo-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 17rem;
  gap: 1rem;
  cursor: pointer;
}

.logo-icon {
  width: 3rem;
  height: 3rem;
}

.logo-icon img {
  width: 100%;
  height: 100%;
}

.logo-text {
  font-size: 2.6rem;
  font-weight: 500;
  color: #202020;
}

.menu-nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.menu-list {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  gap: 2rem;
}

.menu {
  list-style: none;
  font-size: 1.5rem;
  font-weight: 400;
  cursor: pointer;
}

.menu i {
  display: none;
  font-size: 3rem;
}

.github-link{
  display: flex;
  height: 3.6rem;
  width: 3.6rem;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  font-size: 3.6rem;
  text-decoration: none;
  color: #202020;
}

@media screen and (max-width: 600px) {
  .menu-list {
    gap: 3rem;
    margin-right: 1rem;
  }

  .menu-text {
    display: none;
  }

  .menu i {
    display: inline;
  }
}
</style>