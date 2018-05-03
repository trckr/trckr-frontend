<template>
  <div class="component component--project-creation">
    <article>
      <header>
        <h1>Create a project</h1>
      </header>

      <section>
        <div v-if="error" class="message message--error">
          Something went wrong.
        </div>

        <form @submit.prevent="createProject">
          <div class="form-item">
            <label for="name">Project Name</label>
            <input v-model="name" id="name" type="text" required="required" />
          </div>
          <div class="form-item">
            <label for="description">Project Description</label>
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
  import { apiProjects } from '@/api/projects';

  export default {
    name: 'CreateProject',
    data: function() {
      return {
        name: '',
        description: '',
        error: false,
      };
    },
    methods: {
      createProject() {
        const that = this;
        const router = this.$router;
        const token = this.$store.getters.getCurrentUser.token;

        apiProjects.post(
          this.$apiBaseUrl,
          token,
          this.name,
          this.description,
          function() {
            router.push('/projects');
          },
          function(error) {
            that.error = true;
          }
        )
      }
    }
  }
</script>
