<script setup>
import { useFetch } from "@/composables/fetch.js"

// 例として Ruby のリポジトリを引数に渡す
const { data, error } = useFetch('https://api.github.com/repos/ruby/ruby')
</script>

<template>
  <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
  <div v-else-if="data">
    Data loaded:
    <pre>{{ data }}</pre>
  </div>
  <div v-else>Loading...</div>
</template>
