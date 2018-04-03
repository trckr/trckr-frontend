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
        <textarea v-model="projectdesc" id="projectdesc" required="required"></textarea>
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
        const store = this.$store;
        const router = this.$router;

        //TODO: api call doesn't exist in backend yet
        axios.post('https://trckr.trvlr.ch/api/project/', {
          projectname: this.projectname,
          projectdesc: this.projectdesc
        })
          .then(function() {
            router.push('/dashborad')
          })
          .catch(function(error) {
            that.error = true;
          });
      },
    }
  }
</script>
