<script>
export default {
  methods: {
    goToAbout() {
      this.$router.push('/about')
    }
  }
}
</script>

<template>
  <h2>HomeView</h2>
  <button v-on:click="goToAbout">Go to About</button>
</template>