<template>
  <div class="component component--project-creation">
    <div v-if="error" class="message message--error">
      Something went wrong.
    </div>

    <h1>Create a project</h1>
    <form @submit.prevent="createProject">
      <div class="form-item">
        <label for="projectname">Project Name</label>
        <input v-model="projectname" id="projectname" type="text" required="required" />
      </div>
      <div class="form-item">
        <label for="projectdesc">Project Description</label>
        <textarea v-model="projectdesc" id="projectdesc"></textarea>
      </div>
      <div class="form-actions">
        <div class="form-action">
          <input type="submit" value="Create" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import { apiProjects } from '@/api/projects';

  export default {
    name: 'CreateProject',
    data() {
      return {
        projectname: '',
        projectdesc: '',
        error: false,
      }
    },
    methods: {
      createProject(){
        const that = this;
        const router = this.$router;
        const token = this.$store.getters.getCurrentUser.token;

        apiProjects.post(
          this.$apiBaseUrl,
          this.projectname,
          this.projectdesc,
          token,
          function() {
            router.push('/dashboard');
          },
          function(error) {
            that.error = true;
          }
        )
      }
    }
  }
</script>
