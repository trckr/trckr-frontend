<template>
  <div class="component component--time-entry-form">
    <article>
      <header>
        <div class="back--wrapper">
          <router-link :to="{path: '/time-entries'}">Back to Time Entries</router-link>
        </div>
        <h1>{{ title }}</h1>
      </header>

      <section>
        <div v-if="error" class="message message--error">
          Something went wrong.
        </div>

        <form @submit.prevent="createTimeEntry">
          <div class="form-item">
            <label for="projectId">Project</label>
            <select id="projectId" v-model="projectId" v-on:change="resetTask()" required="required">
              <option value="">Please select</option>
              <option v-for="project in projects" :value="project.id">{{ project.name }}</option>
            </select>
          </div>
          <div class="form-item" v-if="projectId">
            <label for="taskId">Task</label>
            <select id="taskId" v-model="taskId" required="required">
              <option value="">Please select</option>
              <option v-for="task in tasks" :value="task.id" v-if="task.project === projectId">{{ task.name }}</option>
            </select>
          </div>
          <div class="form-item">
            <label for="timeSpent">Time (hours)</label>
            <input v-model="timeSpent" id="timeSpent" type="number" step="0.25" required="required" min="0.25" />
          </div>
          <div class="form-item">
            <label for="description">Description</label>
            <textarea v-model="description" id="description"></textarea>
          </div>
          <div class="form-item">
            <label for="date">Date</label>
            <input v-model="date" id="date" type="date" required="required" />
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
  import { apiTasks } from '@/api/tasks';
  import { apiTimeEntries } from '@/api/time-entries';
  import Toasted from 'vue-toasted';

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
        date: new Date().toISOString().substr(0, 10),
        tasks: [],
        projects: [],
        error: false,
      };
    },
    created: function() {
      this.fetchProjects();
      this.fetchTasks();
      var timeEntryId = this.$route.params.timeEntryId;

      if (typeof timeEntryId !== 'undefined') {
        this.title = 'Edit time entry #' + timeEntryId;
        this.timeEntryId = timeEntryId;

        this.fetchTimeEntry();
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
            that.date = response.data.startTime.substring(0, 10);
            that.description = response.data.description;
            that.projectId = response.data.project;
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
      displaySuccessMessage() {
        this.$toasted.show('Time entry was successfully saved.', {
          position: 'top-center',
          type: 'success',
          action: {
            text: 'Close',
            onClick : (e, toastObject) => {
              toastObject.goAway(0);
            },
          },
        });
      },
      createTimeEntry() {
        const that = this;
        const router = this.$router;
        const token = this.$store.getters.getCurrentUser.token;
        var date = this.date + 'T00:00:00';
        var timeEntryId = this.$route.params.timeEntryId;

        if (typeof timeEntryId !== 'undefined') {
          // Update a time entry.
          apiTimeEntries.put(
            this.$apiBaseUrl,
            token,
            timeEntryId,
            this.description,
            this.timeSpent,
            this.taskId,
            date,
            function(response) {
              that.displaySuccessMessage();
              router.push('/time-entries');
            },
            function(error) {
              that.error = true;
            }
          );
        } else {
          // Create a time entry.
          apiTimeEntries.post(
            this.$apiBaseUrl,
            token,
            this.description,
            this.timeSpent,
            this.taskId,
            date,
            function(response) {
              that.displaySuccessMessage();
              router.push('/time-entries');
            },
            function(error) {
              that.error = true;
            }
          );
        }
      },
      resetTask() {
        this.taskId = '';
      },
    },
  }
</script>
