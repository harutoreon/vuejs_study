<script setup>
function handleClick() {
  console.log('It was clicked.')
}
</script>

<template>
  <button type="button" class="btn" @click="handleClick">Save</button>
</template>
