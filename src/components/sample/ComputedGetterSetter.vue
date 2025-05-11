<script setup>
import { ref, computed } from 'vue'

const firstName = ref('')
const lastName = ref('')

const fullName = computed({
  get() {
    return `${firstName.value} ${lastName.value}`
  },
  set(newValue) {
    const names = newValue.split(' ')
    firstName.value = names[0] || ''
    lastName.value = names[1] || ''
  }
})
</script>

<template>
  <input v-model="lastName" placeholder="姓を入力して下さい。">
  <br>
  <input v-model="firstName" placeholder="名を入力して下さい。">

  <p>Full Name: {{ fullName }}</p>
</template>