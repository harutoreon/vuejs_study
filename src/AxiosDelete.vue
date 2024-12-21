<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const users = ref([])

const deleteUser = async (id) => {
  try {
    await axios.delete('https://jsonplaceholder.typicode.com/users/' + id)
    users.value = users.value.filter((user) => user.id !== id)
    console.log(users.value)
  } catch (error) {
    console.error('Failed to delete user:', error)
  }
}

const getUserList = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users')
    users.value = response.data
    console.log(users.value)
  } catch (error) {
    console.error('Failed to load data:', error)
  }
}

onMounted(() => {
  getUserList()
})
</script>

<template>
  <h1>User List</h1>
  <ul>
    <li v-for="user in users" :key="user.id">{{ user.name }}:
      <button v-on:click="deleteUser(user.id)">削除</button>
    </li>
  </ul>
</template>