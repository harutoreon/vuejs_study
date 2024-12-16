<script setup>
import { ref } from 'vue'

const show = ref(true)
const list = ref([1, 2, 3])

console.log(show.value)
console.log(list.value)
</script>

<template>
  <button v-on:click="show = !show">Toggle List</button>
  <button v-on:click="list.push(list.length + 1)">Push Number</button>
  <button v-on:click="list.pop()">Pop Number</button>
  <button v-on:click="list.reverse">Reverse List</button>

  <ul v-if="show && list.length">
    <li v-for="item of list">{{ item }}</li>
  </ul>
  <p v-else-if="list.length">List is not empty, but hidden.</p>
  <p v-else>List is empty.</p>
</template>