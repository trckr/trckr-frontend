<template>
  <div class="component component--project-page">
    <article>
      <header>
        <div class="back">
          <router-link :to="{path: '/projects'}">Back to Projects</router-link>
        </div>
        <h1>{{ project.name }}</h1>

        <div class="main-actions">
          <router-link :to="{path: '/project/edit/'+ projectId }">Edit project</router-link>
        </div>
      </header>

      <section>
        <div v-if="error" class="message message--error">
          Something went wrong.
        </div>

        <p>{{ project.description }}</p>
      </section>
    </article>

    <article>
      <header>
        <h2>Tasks</h2>

        <div class="main-actions">
          <router-link :to="{path: '/project/'+ projectId +'/task/create'}">Create task</router-link>
        </div>
      </header>

      <section>
        <table id="table--project-task" v-if="tasks.length > 0">
          <thead>
            <tr>
              <th>Task</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in tasks">
              <td><router-link :to="{path: projectId +'/task/' + task.id}">{{ task.name }}</router-link></td>
              <td>{{ task.description }}</td>
            </tr>
          </tbody>
        </table>

        <div class="table-empty--message" v-if="tasks.length === 0">
          <p>You don't have any tasks in this project yet.</p>
        </div>
      </section>
    </article>
  </div>
</template>

<script>
  import { apiProjects } from '@/api/projects';
  import { apiTasks } from '@/api/tasks';

  export default {
    name: 'Project',
    data: function() {
      return {
        project: [],
        projectId: 0,
        tasks: [],
        error: false,
      };
    },
    created: function() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        const token = this.$store.getters.getCurrentUser.token;
        const that = this;

        that.projectId = that.$route.params.projectId;

        apiProjects.getSingle(
          this.$apiBaseUrl,
          token,
          this.projectId,
          function(response) {
            that.project = response.data;
          },
          function(error) {
            that.error = true;
          }
        );

        apiTasks.getProjectTasks(
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
          },
        );
      },
    },
  }
</script>
