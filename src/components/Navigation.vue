<template>
  <div class="component component--navigation">
    <nav>
      <ul>
        <li v-if="!this.$store.getters.isLoggedIn"><router-link to="/login">Login</router-link></li>
        <li v-if="!this.$store.getters.isLoggedIn"><router-link to="/register">Register</router-link></li>
        <li v-if="this.$store.getters.isLoggedIn"><router-link to="/dashboard">Dashboard</router-link></li>
        <li v-if="this.$store.getters.isLoggedIn"><router-link to="/projects">Projects</router-link></li>
        <li v-if="this.$store.getters.isLoggedIn"><router-link to="/logout">Logout</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'Navigation',
  }
</script>
