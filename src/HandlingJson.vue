<script setup>
import { ref } from 'vue'

const userList = ref([
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' }
])

console.log(userList.value[0].id)
console.log(userList.value[0].name)
console.log(userList.value[0].email)
</script>

<template>
  <h1>User List</h1>
  <ul>
    <li v-for="user in userList" :key="user.id">
      {{ user.name }} - {{ user.email }}
    </li>
  </ul>
</template>