<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div><h2>This is header</h2></div>
  </header>

  <!-- <RouterView /> -->
  <router-view />
  <footer>
    <div><h2>This is footer</h2></div>
  </footer>
</template>

<style scoped></style>
