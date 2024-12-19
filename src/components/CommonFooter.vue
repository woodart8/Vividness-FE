<template>
  <footer class="common-footer">
    <a href="https://github.com/woodart8" target="_blank" class="github-link">
      <i class="fa-brands fa-square-github"></i>
    </a>
    <span>Copyright 2024 ~ Vividness All rights reserved.</span>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.common-footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 14rem;
  width: 100%;
  gap: 1rem;
  background-color: #f1f1f1;
  font-size: 1.6rem;
  color: #555555;
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
