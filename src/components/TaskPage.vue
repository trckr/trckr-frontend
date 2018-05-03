<template>
  <div class="component component--taskPage">
    <div v-if="error" class="message message--error">
      Something went wrong.
    </div>
    <div v-for="item in task">
      <h1>{{ item.name }}</h1>
      <p>{{ item.description }}</p>
    </div>
  </div>

</template>

<script>
  import { apiTasks } from "@/api/tasks";

  export default {
    name: "TaskPage",
    data: function() {
      return {
        task:[],
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

        that.taskId = that.$route.params.taskId;
        apiTasks.getSingle(
          this.$apiBaseUrl,
          token,
          that.taskId,
          function(response) {
            that.task = response;
          },
          function(error) {
            that.error = true;
          }
        );
      },
    }
  }
</script>
