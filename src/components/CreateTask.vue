<template>
  <div class="component component--create-task">
    <article>
      <header>
        <div class="back--wrapper">
          <router-link :to="{path: '/project/' + projectId}">Back to Project</router-link>
        </div>
        <h1>Create a task</h1>
      </header>

      <section>
        <div v-if="error" class="message message--error">
          Something went wrong.
        </div>

        <form @submit.prevent="createTask">
          <div class="form-item">
            <label for="name">Task Name</label>
            <input v-model="name" id="name" type="text" required="required" />
          </div>

          <div class="form-item">
            <label for="description">Task Description</label>
            <textarea v-model="description" id="description"></textarea>
          </div>
          <div class="form-actions">
            <div class="form-action">
              <input type="submit" value="Create" />
            </div>
          </div>
        </form>
      </section>
    </article>
  </div>
</template>

<script>
  import { apiTasks } from '@/api/tasks';

  export default {
    name: 'CreateTask',
    data: function(){
      return{
        id: '',
        name: '',
        description: '',
        projectId: '',
        error: false,
      };
    },
    methods: {
      createTask() {
        const that = this;
        const router = this.$router;
        const token = this.$store.getters.getCurrentUser.token;

        that.projectId = that.$route.params.projectId;

        apiTasks.post(
          this.$apiBaseUrl,
          token,
          this.name,
          this.description,
          that.projectId,
          function() {
            router.push('/project/' + that.projectId)
          },
          function(error) {
            that.error = true;
          }
        )
      },
    },
  }
</script>
