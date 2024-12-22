<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios'

const users = ref([])
const errorFlag = ref(false)

const getResponse = async () => {
  try {
    // const response = await axios.get('https://jsonplaceholder.typicode.com/users')
    const response = await axios.get('https://jsonplaceholder.typicod.com/users')
    users.value = response.data
    console.log(response.data)
    console.log(response.status)
    console.log(response.headers)
    console.log(response.statusText)
    console.log(response.config)
  } catch (error) {
    console.error('Error fetching data', error)
    errorFlag.value = true
  }
}

onMounted(() => {
  getResponse()
})
</script>

<template>
  <h3 v-show="errorFlag">An error occurred in communication with the server.</h3>

  <ul>
    <li v-for="user in users" :key="user.id">{{ user.name }}</li>
  </ul>
</template>