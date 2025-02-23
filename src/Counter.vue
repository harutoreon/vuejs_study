<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  {{ count }}
  <button v-on:click="count++" class=".button">Count</button>
</template>