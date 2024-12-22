<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const users = ref([])

const baseURL = 'https://jsonplaceholder.typicode.com'
const headers = axios.defaults.headers

const axiosInstance = axios.create({
  baseURL, headers
})

const getUserList = async () => {
  try {
    const response = await axiosInstance.get('users')
    users.value = response.data
    console.log(response.data)
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getUserList()
})
</script>

<template>
  <h1>User List</h1>
  <ul>
    <li v-for="user in users" :key="user.id">{{ user.name }}</li>
  </ul>
</template>