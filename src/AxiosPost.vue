<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const users = ref([])
const name = ref('')

const createNewUser = async () => {
  try {
    const response = await axios.post('https://jsonplaceholder.typicode.com/users',
      {
        name: name.value,
      })
    users.value.unshift(response.data)
    console.log(users.value)
  } catch (error) {
    console.error('Failed to load data:', error)
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
  <input v-model="name"><br>
  <button v-on:click="createNewUser">登録</button>
  <ul>
    <li v-for="user in users" :key="user.id">{{ user.name }}</li>
  </ul>
</template>
