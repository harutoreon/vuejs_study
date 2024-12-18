<script setup>
import { ref } from 'vue'

const message = ref('Hello World!')
const isRed = ref(true)
const color = ref('green')

function toggleRed() {
  isRed.value = !isRed.value
}

function toggleColor() {
  color.value = color.value === 'green' ? 'blue' : 'green'
}
</script>

<template>
  <p>
    <span v-bind:title="message">
      Hover your mouse over me for a few seconds to see my dynamically bound title!
    </span>
  </p>

  <p v-bind:class="{ red: isRed }" v-on:click="toggleRed">
    This should be red... but click me to toggle it.
  </p>

  <p v-bind:style="{ color }" v-on:click="toggleColor">
    This should be green, and should toggle between green and blue on click.
  </p>
</template>

<style>
.red {
  color: red;
}
</style>
