<template>
  <div class="component component--user-login">
    <p v-if="$route.query.redirect">
      Please login first.
    </p>

    <p v-if="error" class="error">
      Wrong login credentials.
    </p>

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
        <input type="submit" value="Login" />
      </div>
    </form>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'UserLogin',
    data () {
      return {
        username: '',
        password: '',
        error: false,
      }
    },
    methods: {
      login: function() {
        const store = this.$store;
        const router = this.$router;
        const username = this.username;

        axios.post('https://trckr.trvlr.ch/api/token-auth/', {
          username:  this.username,
          password: this.password,
          headers: {
            'Content-type': 'application/json',
          }
        }).then(function(response) {
          store.dispatch({
            type: 'login',
            username:  username,
            token: response.data.token,
          }).then(function() {
            router.push('/dashboard');
          });
        }).catch(function(error) {
          console.log(error);
        });
      },
    },
  }
</script>
