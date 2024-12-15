<script setup>
import { ref } from 'vue'

const message = ref('Hello World!')

function reverseMessage() {
  message.value = message.value.split('').reverse().join('')
}

function notify() {
  alert('navigation was prevented.')
}
</script>

<template>
  <h1>{{ message }}</h1>

  <button v-on:click="reverseMessage">Reverse Message</button>

  <button v-on:click="message += '!'">Append "!"</button>

  <a href="https://vuejs.org" v-on:click.prevent="notify">
    A link with e.preventDefault()
  </a>
</template>

<style>
button, a {
  display: block;
  margin-bottom: 1em;
}
</style>