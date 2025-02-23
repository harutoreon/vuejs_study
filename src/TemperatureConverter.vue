<script setup>
import { ref } from 'vue'

const c = ref(0)
const f = ref(32)

function setC(event, v = +event.target.value) {
  c.value = v
  f.value = v * (9 / 5) + 32
}

function setF(event, v = +event.target.value) {
  f.value = v
  c.value = (v - 32) * (5 / 9)
}
</script>

<template>
  <input type="number" v-bind:value="c" v-on:change="setC"> Celsius =
  <input type="number" v-bind:value="f" v-on:change="setF"> Fahrenheit
</template>
