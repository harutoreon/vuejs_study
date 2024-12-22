<script setup>
import { onMounted } from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'

axios.interceptors.request.use((config) => {
  console.log(config)
  return config
})

axios.interceptors.response.use((response) => {
  console.log(response)
  return response
})

const loadData = async () => {
  try {
    const response = await axios.get('/users')
    console.log(response.data)
  } catch (error) {
    console.error('Failed to config data:', error)
  }
}

onMounted(() => {
  loadData()
})
</script>


<template></template>
