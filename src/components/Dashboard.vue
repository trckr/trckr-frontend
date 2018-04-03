<template>
  <div class="component component--dashboard">
    <h1>Dashboard</h1>
    <p>Welcome to <em>trckr</em>!</p>
      <h2>Your Projects</h2>
    <form @submit.prevent="createProject">
      <input type="submit" value="Create Project" />
    </form>
  </div>
</template>

<script>
  import axios from 'axios';
  import router from "../router";

  export default {
    name: 'Dashboard',
    data: function() {
      return {
        pong: 'Waiting for server response',
      }
    },
    created: function() {
      this.fetchData();
    },
    methods: {
      fetchData: function() {
        const token = this.$store.getters.getCurrentUser.token;
        const that = this;

        axios.get('https://trckr.trvlr.ch/api/ping/', {
          headers: {
            'Authorization': 'JWT ' + token
          }
        }).then(function(response) {
          that.pong = response.data;
        }).catch(function(error) {
          that.pong = 'The ping request resulted in an error.'
        });
      },
      createProject() {
        router.push('/createproject')
      }
    }
  }
</script>
