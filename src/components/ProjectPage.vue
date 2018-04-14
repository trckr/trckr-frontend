<template>
  <div class="component component--projectPage">
    <div v-if="error" class="message message--error">
      Something went wrong.
    </div>
    <div v-for="item in project">
      <h1>{{ item.name }}</h1>
      <p>{{ item.description }}</p>
    </div>
    <h2>Tasks</h2>

    <p><router-link :to="{path: '/project/'+ projectid +'/task/create'}">Create</router-link> a new task here!</p>

    <table class="table">
      <thead>
        <tr>
          <th>Project</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks">
          <td><router-link :to="{path: projectid +'/task/' + task.id}">{{ task.name }}</router-link></td>
          <td>{{ task.description }}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "Project",
    data(){
      return {
        project: [],
        projectname: '',
        projectid: 0,
        description: '',
        modifiedDate: '',
        createdDate: '',
        tasks: [],
        error: false,
      }
    },
    created: function() {
      this.fetchData();
    },
    methods: {
      fetchData(){

        const token = this.$store.getters.getCurrentUser.token;
        const that = this;

        that.projectid = that.$route.params.projectid;

        axios.get(this.$apiBaseUrl + '/api/projects/' + that.projectid, {
          headers: {
            'Authorization': 'JWT ' + token
          }
        })
          .then(response => {
            that.project = response;
            that.projectname = response.name;
            that.description = response.description;
            that.modifiedDate = response.modifiedDate;
            that.createdDate = response.createdDate;
          })
          .catch(error => {
            that.error = error;
          });


        axios.get(this.$apiBaseUrl + '/api/projects/' + that.projectid + '/tasks', {
          headers: {
            'Authorization': 'JWT ' + token
          }
        }).then(function (response) {
          that.tasks = response.data;
        }).catch(function (error) {
          that.error = true;
        });
      }
    }
  }

</script>
