<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const users = ref([])

const getUserList = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users')
    users.value = response.data
    console.log(users.value)
  } catch (error) {
    console.error('Failed to load data:', error)
  }
}

const updateUser = async () => {
  try {
    const response = await axios.patch('https://jsonplaceholder.typicode.com/users/1', {
      name: 'John Doe'
    })
    const user = users.value.find((user) => user.id === 1)
    user.name = response.data.name
    console.log(response.data)
  } catch (error) {
    console.error('Failed to update user name:', error)
  }
}

onMounted(() => {
  getUserList()
  updateUser()
})
</script>

<template>
  <h1>User List</h1>
  <ul>
    <li v-for="user in users" :key="user.id">{{ user.name }}</li>
  </ul>
</template>
