<template>
  <div class="component component--navigation">
    <nav>
      <ul>
        <li v-if="!this.$store.getters.isLoggedIn"><router-link to="/login">Login</router-link></li>
        <li v-if="this.$store.getters.isLoggedIn"><router-link to="/dashboard">Dashboard</router-link></li>
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

<style lang="scss" scoped>
  @import '../sass/style.scss';

  nav {
    ul {
      display: block;

      li {
        display: inline-block;

        a {
          color: $color-base-white;
          display: block;
          padding: 1.5rem 1.5rem;
          text-decoration: none;
          transition: $transition-ease-in-out;

          &.router-link-active {
            background-color: $color-nav-active;
          }

          &:hover {
            background-color: $color-nav-hover;
          }
        }
      }
    }
  }
</style>
