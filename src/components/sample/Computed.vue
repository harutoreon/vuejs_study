<script setup>
import { ref, computed } from 'vue'

const firstName = ref('Taro')
const lastName = ref('Yamada')

const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`
})
</script>

<template>
  <p>氏名: {{ fullName }}</p>
</template>