<template>
  <div class="component component--user-login">
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
          <td><input v-model="username" id="username" type="text" required="required" /></td>
        </tr>
        <tr>
          <td><label for="password">Password</label></td>
          <td><input v-model="password" id="password" type="password" required="required" /></td>
        </tr>
        </tbody>
      </table>
    </form>
  </div>
</template>

<script>
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
    login () {
      const router = this.$router;

      this.$store.dispatch({
        type: 'login',
        username:  this.username,
        password: this.password,
      }).then(function() {
        router.push('/dashboard');
      });
    }
  }
}
</script>

<style scoped>
  .component--user-login {
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
