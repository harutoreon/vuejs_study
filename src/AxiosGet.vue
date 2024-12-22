<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const userList = ref([])

const loadData = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users')
    userList.value = response.data
    console.log(userList.value)
  } catch (error) {
    console.error('Failed to load data:', error)
  }
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <ul>
    <li v-for="user in userList" :key="user.id">{{ user.name }}</li>
  </ul>
</template>