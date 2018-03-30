<template>
  <div class="user-login">
    <h1>User Login</h1>

    <form>
      <table>
        <tfoot>
          <tr>
            <td colspan="2"><input type="button" value="Login" /></td>
          </tr>
        </tfoot>
        <tbody>
          <tr>
            <td><label for="">Username</label></td>
            <td><input type="text" /></td>
          </tr>
          <tr>
            <td><label for="">Password</label></td>
            <td><input type="password" /></td>
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
      msg: 'Please log in'
    }
  }
}
</script>

<style scoped>
  .user-login {
    margin: 0 auto;
    max-width: 30rem;
  }

  table {
    width: 100%;
  }

  label {
    margin-right: 2rem;
    width: 13rem;
  }

  input[type=text],
  input[type=password] {
    width: 15rem;
  }
</style>
