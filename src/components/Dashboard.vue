<template>
  <div class="component component--dashboard">
    <h1>Dashboard</h1>
    <p>Welcome to <em>trckr</em>!</p>
    <p><router-link :to="{path: '/createproject'}">Create</router-link> a new project here!</p>

    <table class="table">
      <thead>
      <tr>
        <th>Project</th>
        <th>Description</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="project in projects">
        <td><router-link :to="{path: '/project/' + project.id}">{{ project.name }}</router-link></td>
        <td>{{ project.description }}</td>
      </tr>
      </tbody>
    </table>

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
        projects: [],
        error: ''
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
          that.error = 'there was a problem'
        });
      },
    }
  }
</script>
