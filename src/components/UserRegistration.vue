<template>
    <div class="component component--user-registration">
      <p v-if="$route.query.redirect">
        Please register first.
      </p>

      <p v-if="error" class="error">
        Something went wrong
      </p>

      <h1>User Registration</h1>

      <form @submit.prevent="register">
        <div class="form-item">
          <label for="username">Username</label>
          <input v-model="username" id="username" type="text" />
        </div>
        <div class="form-item">
          <label for="email">E-Mail</label>
          <input v-model="email" id="email" type="email" />
        </div>
        <div class="form-item">
          <label for="password">Password</label>
          <input v-model="password" id="password" type="password">
        </div>
        <div class="form-item">
          <label for="first_name">First name</label>
          <input v-model="first_name" id="first_name" type="text" />
        </div>
        <div class="form-item">
          <label for="last_name">Last name</label>
          <input v-model="last_name" id="last_name" type="text" />
        </div>
        <div class="form-item">
          <p><input type="submit" value="Register" /> &ensp; Already have an account? <router-link :to="{path: '/login'}">Login</router-link></p>
        </div>
      </form>
    </div>
</template>

<script>
  import axios from "axios"
  import router from "../router";

  export default {
    name: 'UserRegistration',
    data() {
      return {
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        error: false
      }
    },
    methods: {
      register() {
        const that = this;
        const store = this.$store;
        const router = this.$router;
        const username = this.username;

        axios.post('https://trckr.trvlr.ch/api/user/', {
          username: this.username,
          email: this.email,
          password: this.password,
          first_name: this.first_name,
          last_name: this.last_name,
        })
          .then(response => {
            store.dispatch({
              type: 'login',
              username: username,
              token: response.data.token,
            })
          })
          .then(function() {
            router.push('/dashboard')
          })
          .catch(error => {
            that.error = true;
          })
      }
    }
  }
</script>

<style scoped>
  .user-register {
    display: inline-block;
    margin: 0 auto;
  }

  table {
    width: 100%;
  }

  td {
    text-align: left;
  }

  label {
    margin-right: 1.5rem;
  }

  input[type=text],
  input[type=email],
  input[type=password] {
    width: 15rem;
  }

  main {
    align-items: center;
    display: flex;
    justify-content: center;
    min-height: 100vh;
  }
</style>
