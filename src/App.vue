<template>
  <CommonHeader></CommonHeader>
  <router-view></router-view>
  <CommonFooter></CommonFooter>
</template>

<script setup>
import CommonFooter from './components/CommonFooter.vue';
import CommonHeader from './components/CommonHeader.vue';
</script>
