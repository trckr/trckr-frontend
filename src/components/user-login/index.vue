<template>
  <div class="user-login">
    <p v-if="$route.query.redirect">
      Please login first.
    </p>

    <p v-if="error" class="error">
      Wrong login credentials.
    </p>

    <h1>User Login</h1>

    <form @submit.prevent="login">
      <table>
        <tfoot>
          <tr>
            <td colspan="2"><input type="submit" value="Login" /></td>
          </tr>
        </tfoot>
        <tbody>
          <tr>
            <td><label for="username">Username</label></td>
            <td><input v-model="username" id="username" type="text" /></td>
          </tr>
          <tr>
            <td><label for="password">Password</label></td>
            <td><input v-model="password" id="password" type="password"></td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>
</template>

<script>
export default {
  name: 'user-login',
  data () {
    return {
      username: '',
      password: '',
      error: false,
    }
  },
  methods: {
    login () {
      auth.login(this.username, this.password, loggedIn => {
        if (!loggedIn) {
          this.error = true
        } else {
          this.$router.replace(this.$route.query.redirect || '/')
        }
      })
    }
  }
}
</script>

<style scoped>
  .user-login {
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
  input[type=password] {
    width: 15rem;
  }
</style>
