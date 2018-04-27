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
        projectId: 0,
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

        that.projectId = that.$route.params.projectId;

        apiProjects.getSingle(
          this.$apiBaseUrl,
          token,
          this.projectId,
          function(response) {
            that.project = response;
          },
          function(error) {
            that.error = true;
          }
        );

        apiTasks.getAll(
          this.$apiBaseUrl,
          token,
          this.projectId,
          function(response) {
            var tasks = [];

            for (var i = 0; i < response.data.length; i++) {
              var task = {
                name: response.data[i]['name'],
                id: response.data[i]['id'],
                description: response.data[i]['description'],
                project: response.data[i]['project'],
              };
              tasks.push(task);
            }
            that.tasks  = tasks;
          },
          function(error) {
            that.error = true;
          }
        );
      }
    }
  }

</script>
