<template>
  <main>
    <div class="user-registration">
      <p v-if="$route.query.redirect">
        Please register first.
      </p>

      <p v-if="error" class="error">
        Something went wrong
      </p>

      <h1>User Registration</h1>

      <form @submit.prevent="register">
        <table>
          <tfoot>
          <tr>
            <td colspan="2"><input type="submit" value="Register" /></td>
          </tr>
          </tfoot>
          <tbody>
          <tr>
            <td><label for="username">Username</label></td>
            <td><input v-model="username" id="username" type="text" /></td>
          </tr>
          <tr>
            <td><label for="email">E-Mail</label></td>
            <td><input v-model="email" id="email" type="email" /></td>
          </tr>
          <tr>
            <td><label for="password">Password</label></td>
            <td><input v-model="password" id="password" type="password"></td>
          </tr>
          <tr>
            <td><label for="first_name">First name</label></td>
            <td><input v-model="first_name" id="first_name" type="text" /></td>
          </tr>
          <tr>
            <td><label for="last_name">Last name</label></td>
            <td><input v-model="last_name" id="last_name" type="text" /></td>
          </tr>
          </tbody>
        </table>
      </form>
    </div>
  </main>
</template>

<script>
  import axios from "axios"

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
      // TODO: check if user is already logged in

      register() {

        const that = this;
        const store = this.$store;
        const router = this.$router;
        const username = this.username;

        console.log(typeof username);
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
