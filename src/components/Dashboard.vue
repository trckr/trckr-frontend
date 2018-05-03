<template>
  <div class="component component--dashboard">
    <article>
      <header>
        <h1>Dashboard</h1>
      </header>

      <section class="content">
        <div v-if="error" class="message message--error">
          Something went wrong.
        </div>

        <p>Welcome to <em>trckr</em>!</p>
        <p>Pong response: <em>{{ pong }}</em></p>
      </section>
    </article>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'Dashboard',
    data: function() {
      return {
        pong: 'Waiting for server response',
        projects: [],
        search: '',
        error: false,
      };
    },
    created: function() {
      this.fetchData();
    },
    methods: {
      fetchData: function() {
        const token = this.$store.getters.getCurrentUser.token;
        const that = this;

        axios.get(this.$apiBaseUrl + '/api/ping/', {
          headers: {
            'Authorization': 'Token ' + token
          }
        }).then(function(response) {
          that.pong = response.data;
        }).catch(function(error) {
          that.pong = 'The ping request resulted in an error.'
        });
      },
    },
  }
</script>
