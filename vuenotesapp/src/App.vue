<script setup>
import { RouterLink, RouterView } from "vue-router";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import "bootstrap/dist/css/bootstrap.min.css";
</script>

<template>
  <div>
    <Header :pageTitle="pageTitle" />
    <router-view />
    <Footer />
  </div>
</template>

<style scoped></style>
