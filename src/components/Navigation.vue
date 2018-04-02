<template>
  <nav>
    <ul>
      <router-link to="/login">Login</router-link>
      <router-link to="/dashboard">Dashboard</router-link>
      <router-link to="/logout">Logout</router-link>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
}
</script>

<style scoped>
</style>
