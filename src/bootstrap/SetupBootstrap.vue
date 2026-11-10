<script setup>
import { ref } from 'vue'

const isDone = ref(false)
const completeSetup = () => {
  isDone.value = true
}
</script>

<template>
  <button
    type="button"
    class="btn"
    :class="isDone ? 'btn-success' : 'btn-primary'"
    :disabled="isDone"
    @click="completeSetup"
  >
    {{ isDone ? 'Setup Complete' : 'Setup Bootstrap' }}
  </button>
</template>
