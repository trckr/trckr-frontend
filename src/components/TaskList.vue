<template>
  <div class="component component--task-list table-wrapper">
    <table id="table--project-task">
      <thead>
        <tr>
          <th>Task</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks">
          <td><router-link :to="{path: 'project/' + task.project +'/task/' + task.id}">{{ task.name }}</router-link></td>
          <td>{{ task.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { apiTasks } from '@/api/tasks';

  export default {
    name: "TaskList",
    props: ['max'],
    data: function() {
      return {
        projectId: 0,
        tasks: [],
        error: false,
      };
    },
    created: function() {
      this.fetchData();
    },
    methods: {
      fetchData(){
        const token = this.$store.getters.getCurrentUser.token;
        const that = this;

        apiTasks.getAll(
          this.$apiBaseUrl,
          token,
          function(response) {
            that.tasks  = response.data;
          },
          function(error) {
            that.error = true;
          },
        );
      }
    }
  }

</script>
