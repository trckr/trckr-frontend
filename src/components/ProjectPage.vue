<template>
  <div class="component component--project-page">
    <article>
      <header>
        <div class="back--wrapper">
          <router-link :to="{path: '/projects'}" class="icon icon--back">Back to projects</router-link>
        </div>

        <div v-if="error" class="message message--error">
          Something went wrong.
        </div>

        <h1>{{ project.name }}</h1>
      </header>

      <section>
        <p>{{ project.description }}</p>

        <div class="main-actions">
          <router-link :to="{path: '/project/edit/'+ projectId }" class="icon icon--edit">Edit project</router-link>
        </div>
      </section>
    </article>

    <article>
      <header>
        <h2>Tasks</h2>
      </header>

      <section>
        <div class="table-wrapper">
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
        </div>

        <div class="table-empty--message" v-if="tasks.length === 0">
          <p>You don't have any tasks in this project yet.</p>
        </div>

        <div class="main-actions">
          <router-link :to="{path: '/project/'+ projectId +'/task/create'}" class="icon icon--add">Create task</router-link>
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

        /**
         * this method will load in the project data such as the title and the description, which is displayed at the
         * top of the page
         */
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

        /**
         * this method will load all the tasks for the selected project, the tasks are then iteratively added to a
         * generated table.
         */
        apiTasks.getAllByProject(
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
            that.tasks = tasks;
          },
          function(error) {
            that.error = true;
          },
        );
      },
    },
  }
</script>
