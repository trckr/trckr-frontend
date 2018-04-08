<template>
  <div class="component component--dashboard">
    <h1>Dashboard</h1>
    <p>Welcome to <em>trckr</em>!</p>
    <div class="container" id="projectContainer">
      <p><router-link :to="{path: '/createproject'}">Create</router-link> a new project here!</p>
      <div class="field" v-for="project in projects">
        <!--project.id doesn't get returned yet, so testing with project.name-->
        <router-link :to="{path: '/project/' + project.id}">{{ project.name }}</router-link>
      </div>
    </div>
    <p>Pong response: <em>{{ pong }}</em></p>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'Dashboard',
    data: function() {
      return {
        pong: 'Waiting for server response',
        projects: []
      }
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
            'Authorization': 'JWT ' + token
          }
        }).then(function(response) {
          that.pong = response.data;
        }).catch(function(error) {
          that.pong = 'The ping request resulted in an error.'
        });

        axios.get(this.$apiBaseUrl + '/api/projects/', {
          headers: {
            'Authorization': 'JWT ' + token
          }
        }).then(function (response) {
          that.projects = response.data;
        }).catch(function (error) {
          that.pong = 'there was a problem'
        });
      },
    }
  }
</script>
