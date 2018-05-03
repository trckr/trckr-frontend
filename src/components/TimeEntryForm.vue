<template>
  <div class="component component--create-time-entry">
    <article>
      <header>
        <h1>{{ title }}</h1>
      </header>

      <section>
        <div v-if="error" class="message message--error">
          Something went wrong.
        </div>

        <form @submit.prevent="createTimeEntry">
          <div class="form-item">
            <label for="projectId">Project</label>
            <select id="projectId" v-model="projectId" v-on:change="fetchTasks()" required="required">
              <option value="">Please select</option>
              <option v-for="project in projects" :value="project.id">{{ project.name }}</option>
            </select>
          </div>
          <div class="form-item" v-if="projectId">
            <label for="taskId">Task</label>
            <select id="taskId" v-model="taskId" required="required">
              <option value="">Please select</option>
              <option v-for="task in tasks" :value="task.id">{{ task.name }}</option>
            </select>
          </div>
          <div class="form-item">
            <label for="description">Description</label>
            <textarea v-model="description" id="description"></textarea>
          </div>
          <div class="form-item">
            <label for="timeSpent">Time (hours)</label>
            <input v-model="timeSpent" id="timeSpent" type="number" step="0.25" required="required" min="0.25" />
          </div>
          <div class="form-actions">
            <div class="form-action">
              <input type="submit" value="Save time entry" />
            </div>
          </div>
        </form>
      </section>
    </article>
  </div>
</template>

<script>
  import { apiProjects } from '@/api/projects';
  import { apiTasks } from "@/api/tasks";
  import { apiTimeEntries } from '@/api/time-entries';

  export default {
    name: 'TimeEntryForm',
    data: function() {
      return {
        title: 'Create a time entry',
        timeEntryId: '',
        description: '',
        timeSpent: '',
        taskId: '',
        projectId: '',
        tasks: [],
        projects: [],
        error: false,
      };
    },
    created: function() {
      var timeEntryId = this.$route.params.timeEntryId;

      if (typeof timeEntryId !== 'undefined') {
        this.title = 'Edit time entry #' + timeEntryId;
        this.timeEntryId = timeEntryId;

        this.fetchTimeEntry();
      } else {
        this.fetchProjects();
      }
    },
    methods: {
      fetchTimeEntry() {
        const token = this.$store.getters.getCurrentUser.token;
        const that = this;

        apiTimeEntries.getSingle(
          this.$apiBaseUrl,
          token,
          this.timeEntryId,
          function(response) {
            that.description = response.data.description;
            that.taskId = response.data.task;
            that.timeSpent = response.data.timeSpent;
          },
          function(error) {
            that.error = true;
          }
        );
      },
      fetchProjects() {
        const token = this.$store.getters.getCurrentUser.token;
        const that = this;

        apiProjects.getAll(
          this.$apiBaseUrl,
          token,
          function(response) {
            that.projects = response.data;
          },
          function(error) {
            that.error = true;
          }
        )
      },
      fetchTasks() {
        const token = this.$store.getters.getCurrentUser.token;
        const that = this;

        apiTasks.getAll(
          this.$apiBaseUrl,
          token,
          that.projectId,
          function(response) {
            that.tasks = response.data;
          },
          function(error) {
            that.error = true;
          }
        );
      },
      createTimeEntry() {
        const that = this;
        const router = this.$router;
        const token = this.$store.getters.getCurrentUser.token;

        apiTimeEntries.post(
          this.$apiBaseUrl,
          token,
          this.description,
          this.timeSpent,
          this.taskId,
          function(response) {
            router.push('/time-entries');
          },
          function(error) {
            that.error = true;
          }
        )
      },
    }
  }
</script>
