<template>
  <div class="component component--user-registration">
    <article>
      <header>
        <h1>User registration</h1>
      </header>

      <section>
        <div v-if="error" class="message message--error">
          Something went wrong.
        </div>

        <form @submit.prevent="register">
          <div class="form-item">
            <label for="username">Username</label>
            <input v-model="username" id="username" type="text" required="required" />
          </div>
          <div class="form-item">
            <label for="password">Password</label>
            <input v-model="password" id="password" type="password" required="required" />
          </div>
          <div class="form-item">
            <label for="email">Email</label>
            <input v-model="email" id="email" type="email" required="required" />
          </div>
          <div class="form-item">
            <label for="first_name">First name</label>
            <input v-model="first_name" id="first_name" type="text" required="required" />
          </div>
          <div class="form-item">
            <label for="last_name">Last name</label>
            <input v-model="last_name" id="last_name" type="text" required="required" />
          </div>
          <div class="form-actions">
            <div class="form-action">
              <input type="submit" value="Register" />
            </div>
            <div class="form-action">
              <p>Already have an account? <router-link :to="{path: '/login'}">Login</router-link>!</p>
            </div>
          </div>
        </form>
      </section>
    </article>
  </div>
</template>

<script>
  import { apiUser } from '@/api/user';

  export default {
    name: 'UserRegistration',
    data: function() {
      return {
        username: '',
        password: '',
        email: '',
        first_name: '',
        last_name: '',
        error: false,
      }
    },
    methods: {
      register() {
        const that = this;
        const store = this.$store;
        const router = this.$router;
        const username = this.username;

        apiUser.post(
          this.$apiBaseUrl,
          this.username,
          this.email,
          this.password,
          this.first_name,
          this.last_name,
          function(response) {
            store.dispatch({
              type: 'login',
              username: username,
              token: response.data.token,
            }).then(function() {
              router.push('/dashboard')
            }).catch(function() {
              that.error = true;
            });
          },
          function(error) {
            that.error = true;
          },
        );
      }
    }
  }
</script>
