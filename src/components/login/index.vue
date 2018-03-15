<template>
  <div>
    <form class="login" @submit.prevent="login">
      <h2>Login</h2>
      <label>User name</label>
      <input required v-model="username" type="text" placeholder="" />
      <label>Password</label>
      <input required v-model="password" type="password" placeholder="" />
      <hr/>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<style>
  .login {
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 10px;
  }
</style>

<script>
  import {AUTH_REQUEST} from 'actions/auth'

  export default {
    name: 'login',
    data () {
      return {
        username: '',
        password: '',
      }
    },
    methods: {
      login: function () {
        const { username, password } = this
        this.$store.dispatch(AUTH_REQUEST, { username, password }).then(() => {
          this.$router.push('/')
        })
      }
    },
  }
</script>
