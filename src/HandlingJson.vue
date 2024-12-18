<script setup>
import users from './assets/users.json'
</script>

<template>
  <h1>User List</h1>
  <ul>
    <li v-for="user in users" v-bind:key="user.id">
      {{ user.name }} - {{ user.email }}
    </li>
  </ul>
</template>