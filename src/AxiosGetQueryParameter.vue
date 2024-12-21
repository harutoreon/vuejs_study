<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const user = ref(null)

const loadData = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users',
      {
        params: {
          name: 'Glenna Reichert'
        }
      })
    user.value = response.data[0]
    console.log(user.value)
  } catch (error) {
    console.error('Failed to load data:', error)
  }
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <p v-if="user">{{ user.name }}</p>
  <p v-else>Loading...</p>
</template>
