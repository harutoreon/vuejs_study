<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'

const data = ref([])

const loadData = async () => {
  try {
    const response = await axios.get('https://api.github.com/repos/ruby/ruby')
    data.value = response.data
  } catch (error) {
    console.error('Failed to load data:', error)
  }
}

onMounted(() => {
  loadData()
})

watch(data, (newData) => {
  console.log(newData['description'])
})
</script>

<template>
  <p>{{ data.description }}</p>
</template>
