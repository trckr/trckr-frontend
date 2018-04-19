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

    <p><router-link :to="{path: '/project/edit/'+ projectid }">Edit</router-link> your project here!</p>
    <p><router-link :to="{path: '/project/'+ projectid +'/task/create'}">Create</router-link> a new task here!</p>

    <table id="table--project-task">
      <thead>
        <tr>
          <th>Task</th>
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
  import { apiProjects } from '@/api/projects';
  import { apiTasks } from '@/api/tasks';

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

        // TODO: error handling
        apiProjects.getOne(
          this.$apiBaseUrl,
          that.projectid,
          token,
          function(response) {
            that.project = response;
            that.projectname = response.name;
            that.description = response.description;
            that.modifiedDate = response.modifiedDate;
            that.createdDate = response.createdDate;
          }
        );

        // TODO: error handling
        apiTasks.getAllTasks(
          this.$apiBaseUrl,
          this.projectid,
          token,
          function(response) {
            that.tasks  = response.data;
          }
        );
      }
    }
  }

</script>
