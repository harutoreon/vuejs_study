<script setup>
import { ref, computed } from 'vue'

const count = ref(1)

const plusOne = computed({
  get: () => count.value + 1,
  set: (val) => {
    count.value = val -1
  }
})

plusOne.value = 1

console.log(count.value)  // 0
</script>

<template></template>
