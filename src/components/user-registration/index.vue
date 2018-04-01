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
            <td><input v-model="email" id="email" type="text" /></td>
          </tr>
          <tr>
            <td><label for="password">Password</label></td>
            <td><input v-model="password" id="password" type="password"></td>
          </tr>
          </tbody>
        </table>
      </form>
    </div>
  </main>
</template>

<script>
export default {
  name: 'user-registration',
  data () {
    return {
      username: '',
      email: '',
      password: '',
      error: false,
    }
  },
  methods: {
    register () {
      auth.register(this.username, this.email, this.password, registered => {
        if (!registered) {
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
