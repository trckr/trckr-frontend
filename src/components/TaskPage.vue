<template>
  <div class="component component--task-page">
    <article>
      <header>
        <div class="back--wrapper">
          <router-link :to="{path: '/project/' + projectId}" class="icon icon--back">Back to project</router-link>
        </div>
        <h1>{{ task.name }}</h1>
      </header>

      <section>
        <div v-if="error" class="message message--error">
          Something went wrong.
        </div>

        <p>{{ task.description }}</p>
      </section>

      <footer>
        <div class="main-actions">
          <router-link :to="{path: '/time-entry/create'}" class="icon icon--add">Create time entry</router-link>
        </div>
      </footer>
    </article>
  </div>
</template>

<script>
  import { apiTasks } from '@/api/tasks';

  export default {
    name: 'TaskPage',
    data: function() {
      return {
        task: [],
        projectId: '',
        error: false,
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        const token = this.$store.getters.getCurrentUser.token;
        const that = this;

        that.projectId = that.$route.params.projectId;
        that.taskId = that.$route.params.taskId;

        /**
         * this method loads the task data that is then displayed on the task page.
         */
        apiTasks.getSingle(
          this.$apiBaseUrl,
          token,
          that.taskId,
          function(response) {
            // data that is displayed on page
            that.task = response.data;
          },
          function(error) {
            that.error = true;
          }
        );
      },
    },
  }
</script>
