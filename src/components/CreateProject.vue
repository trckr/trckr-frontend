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
      <div class="form-action">
        <input type="submit" value="Create" />
      </div>
    </form>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'CreateProject',
    data(){
      return{
        projectname: '',
        projectdesc: '',
        error: false
      }
    },
    methods: {
      createProject(){
        const that = this;
        const router = this.$router;
        const token = this.$store.getters.getCurrentUser.token;

        axios.post('https://trckr-api.trvlr.ch/api/projects/', {
            name: this.projectname,
            description: this.projectdesc
          },{
            headers: {
              'Authorization': 'JWT ' + token
            }}
        )
          .then(function() {
            router.push('/dashboard')
          })
          .catch(function(error) {
            that.error = true;
          });
      },
    }
  }
</script>
