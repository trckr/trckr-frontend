<template>
  <div class="component component--user-login">
    <div v-if="error" class="message message--error">
      Wrong login credentials. Please try again.
    </div>

    <h1>Login</h1>

    <form @submit.prevent="login">
      <div class="form-item">
        <label for="username">Username</label>
        <input v-model="username" id="username" type="text" required="required" />
      </div>

      <div class="form-item">
        <label for="password">Password</label>
        <input v-model="password" id="password" type="password" required="required" />
      </div>

      <div class="form-actions">
        <div class="form-action">
          <input type="submit" value="Login" />
        </div>
        <div class="form-action">
          <p>Don't have an account yet? <router-link :to="{path: '/register'}">Register</router-link> now!</p>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'UserLogin',
    data: function() {
      return {
        username: '',
        password: '',
        error: false,
      }
    },
    methods: {
      login: function() {
        const that = this;
        const store = this.$store;
        const router = this.$router;
        const username = this.username;

        axios.post('https://trckr.trvlr.ch/api/token-auth/', {
          username:  this.username,
          password: this.password,
          headers: {
            'Content-type': 'application/json',
          },
        }).then(function(response) {
          store.dispatch({
            type: 'login',
            username:  username,
            token: response.data.token,
          }).then(function() {
            router.push('/dashboard');
          });
        }).catch(function(error) {
          that.error = true;
        });
      },
    },
  }
</script>
