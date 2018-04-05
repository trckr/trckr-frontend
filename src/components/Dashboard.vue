<template>
  <div class="component component--dashboard">
    <h1>Dashboard</h1>
    <p>Welcome to <em>trckr</em>!</p>
    <h2>Your Projects</h2>
    <form @submit.prevent="createProject">
      <input type="submit" value="Create New Project" />
    </form>
    <div class="container" id="projectContainer">
      <div class="field" v-for="project in projects">
        <!--project.id doesn't get returned yet, so testing with project.name-->
        <router-link :to="{path: '/project/' + project.id}">{{ project.name }}</router-link>
      </div>
    </div>
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
        projects: []
      }
    },
    created: function() {
      this.fetchData();
    },
    methods: {
      fetchData: function () {
        const token = this.$store.getters.getCurrentUser.token;
        const that = this;

        axios.get('https://trckr-api.trvlr.ch/api/ping/', {
          headers: {
            'Authorization': 'JWT ' + token
          }
        }).then(function (response) {
          that.pong = response.data;
        }).catch(function (error) {
          that.pong = 'The ping request resulted in an error.'
        });

        axios.get('https://trckr-api.trvlr.ch/api/projects/', {
          headers: {
            'Authorization': 'JWT ' + token
          }
        }).then(function (response) {
          that.projects = response.data;
        }).catch(function (error) {
          that.pong = 'The ping request resulted in an error.'
        });

      },
    }
  }
</script>
