<template>
  <div class="component component--time-entries">
    <article>
      <header>
        <h1>Time Entries</h1>

        <div class="main-actions">
          <router-link :to="{path: '/time-entry/create'}">Create time entry</router-link>
        </div>
      </header>

      <section>
        <div v-if="error" class="message message--error">
          Something went wrong.
        </div>

        <table id="time-entries" v-if="timeEntries.length > 0">
          <thead>
            <tr>
              <th>Date</th>
              <th>Project</th>
              <th>Task</th>
              <th>Description</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="timeEntry in timeEntries">
              <td>{{ timeEntry.date }}</td>
              <td>{{ timeEntry.projectName }}</td>
              <td>{{ timeEntry.taskName }}</td>
              <td>{{ timeEntry.description }}</td>
              <td>{{ timeEntry.timeSpent }}</td>
              <td><router-link :to="{path: '/time-entry/' + timeEntry.id + '/edit'}">Edit</router-link></td>
            </tr>
          </tbody>
        </table>

        <div class="table-empty--message" v-if="timeEntries.length === 0">
          <p>You don't have any time entries yet.</p>
        </div>
      </section>
    </article>
  </div>
</template>

<script>
  import { apiProjects } from '@/api/projects';
  import { apiTasks } from '@/api/tasks';
  import { apiTimeEntries } from '@/api/time-entries';

  export default {
    name: 'TimeEntries',
    data: function() {
      return {
        timeEntries: [],
        projects: [],
        tasks: [],
        error: false,
      };
    },
    created: function() {
      this.fetchTimeEntries();
      this.fetchProjects();
      this.fetchTasks();
    },
    methods: {
      fetchTimeEntries: function() {
        const token = this.$store.getters.getCurrentUser.token;
        const that = this;

        apiTimeEntries.getAll(
          this.$apiBaseUrl,
          token,
          function(response) {
            for (let i = 0; i < response.data.length; i++) {
              // Clean up dates.
              var date = new Date(response.data[i].startTime);
              var day = date.getDate();
              var month = date.getMonth() + 1;
              day = day < 10 ? '0' + day : day;
              month = month < 10 ? '0' + month : month;

              response.data[i].date = day + '.' + month + '.' + date.getFullYear();

              // Clean up numbers.
              response.data[i].timeSpent = parseFloat(response.data[i].timeSpent).toFixed(2);

              // Set project name.
              response.data[i].projectName = that.getProjectName(response.data[i].project);

              // Set task name.
              response.data[i].taskName = that.getTaskName(response.data[i].task);
            }

            that.timeEntries = response.data;
          },
          function(error) {
            that.error = true;
          }
        )
      },
      fetchProjects() {
        const token = this.$store.getters.getCurrentUser.token;
        const that = this;

        apiProjects.getAll(
          this.$apiBaseUrl,
          token,
          function(response) {
            that.projects = response.data;

            // Update project names.
            for (let i = 0; i < that.timeEntries.length; i++) {
              that.timeEntries[i].projectName = that.getProjectName(that.timeEntries[i].project);
            }
          },
          function(error) {
            that.error = true;
          }
        )
      },
      getProjectName(projectId) {
        for (let i = 0; i < this.projects.length; i++) {
          if (this.projects[i].id === projectId) {
            return this.projects[i].name;
          }
        }

        return '';
      },
      fetchTasks() {
        const token = this.$store.getters.getCurrentUser.token;
        const that = this;

        apiTasks.getAll(
          this.$apiBaseUrl,
          token,
          function(response) {
            that.tasks = response.data;

            // Update task names.
            for (let i = 0; i < that.timeEntries.length; i++) {
              that.timeEntries[i].taskName = that.getTaskName(that.timeEntries[i].task);
            }
          },
          function(error) {
            that.error = true;
          }
        );
      },
      getTaskName(taskId) {
        for (let i = 0; i < this.tasks.length; i++) {
          if (this.tasks[i].id === taskId) {
            return this.tasks[i].name;
          }
        }

        return '';
      },
    },
  }
</script>
