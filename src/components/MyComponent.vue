<script setup>
import { useCounter } from "@/composables/useCounter.js"

const { count, increment, decrement } = useCounter(10)
</script>

<template>
  <div>
    <p>現在の値: {{ count }}</p>
    <button @click="increment">増やす</button>
    <button @click="decrement">減らす</button>
  </div>
</template>
