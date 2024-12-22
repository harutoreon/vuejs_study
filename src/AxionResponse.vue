<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios'

const users = ref([])

const getResponse = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users')
    users.value = response.data
    console.log(response.data)
    console.log(response.status)
    console.log(response.headers)
    console.log(response.statusText)
    console.log(response.config)
  } catch (error) {
    console.error('Error fetching data', error)
  }
}

onMounted(() => {
  getResponse()
})
</script>

<template>
  <h1>User List</h1>
  <ul>
    <li v-for="user in users" :key="user.id">{{ user.name }}</li>
  </ul>
</template>