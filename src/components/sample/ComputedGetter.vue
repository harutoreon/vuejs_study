<script setup>
import { ref, computed } from 'vue'

const count = ref(1)
const plusOne = computed(() => count.value + 1)

console.log(plusOne.value)

plusOne.value++  // [Vue warn] Write operation failed: computed value is readonly
</script>

<template></template>
