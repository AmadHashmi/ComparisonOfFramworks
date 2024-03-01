<template>
  <header class="py-3">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center">
        <router-link :to="{ name: 'notes' }" class="text-decoration-none">
          <h2 class="text-black">{{ pageTitle }}</h2>
        </router-link>
        <button class="btn btn-primary" @click="handleNewNote">New Note</button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const pageTitle = ref("Note Manager - Vue");
const router = useRouter();

const handleNewNote = () => {
  router.push("/create");
};
</script>

<style scoped>
.text-black {
  color: black;
}
</style>
