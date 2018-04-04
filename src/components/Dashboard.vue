<template>
  <div class="component component--dashboard">
    <h1>Dashboard</h1>
    <p>Welcome to <em>trckr</em>!</p>
    <h2>Your Projects</h2>
    <form @submit.prevent="createProject">
      <input type="submit" value="Create New Project" />
    </form>
    <div class="container" id="projectContainer">
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
      }
    },
    created: function() {
      this.fetchData();
    },
    methods: {
      fetchData: function() {
        const token = this.$store.getters.getCurrentUser.token;
        const that = this;

        that.getprojects();

        axios.get('https://trckr-api.trvlr.ch/api/ping/', {
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
      },
      getprojects(){
        // TODO:
        // - loop correctly through json response
        // - redirect to correct projectpage
        // - call this method on creation of page
        // - router-link doesn't work yet

        const token = this.$store.getters.getCurrentUser.token;
        axios.get('https://trckr-api.trvlr.ch/api/project/', {
          headers: {
            'Authorization': 'JWT ' + token
          }
        })
          .then(response => {

            for (var count in response.data){
              var projectname =  response.data[count].name;

              var project = document.createElement("div");
              project.style.width = "200px";
              project.style.height = "50px";

              project.innerHTML = "<router-link :to=\"{path: '/dashboard'}\">" + projectname + "</router-link>";
              document.getElementById("projectContainer").appendChild(project);
            }
          })
          .catch({

          });
      },
    }
  }
</script>
