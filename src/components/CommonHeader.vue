<template>
  <header class="common-header">
    <div class="logo-wrapper">
      <div class="logo-icon">
        <img src="/src/assets/logo.svg" alt="Logo Icon">
      </div>
      <span class="logo-text">Vividness</span>
    </div>
    <a href="https://github.com/woodart8" target="_blank" class="github-link">
      <i class="fa-brands fa-square-github"></i>
    </a>
  </header>
</template>

<script setup>
import { ref } from 'vue';
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
</style>