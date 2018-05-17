<template>
  <div class="component component--task-page">
    <article>
      <header>
        <div class="back--wrapper">
          <router-link :to="{path: '/project/' + projectId}">Back to Project</router-link>
        </div>
        <h1>{{ task.name }}</h1>
      </header>

      <section>
        <div v-if="error" class="message message--error">
          Something went wrong.
        </div>

        <p>{{ task.description }}</p>
      </section>
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

        apiTasks.getSingle(
          this.$apiBaseUrl,
          token,
          that.taskId,
          function(response) {
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
