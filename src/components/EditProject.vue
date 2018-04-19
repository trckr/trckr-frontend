<template>
  <div class="component component--project-edit">
    <div v-if="error" class="message message--error">
      Something went wrong.
    </div>

    <h1>Edit Project </h1>
    <form @submit.prevent="editProject">
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
          <input type="submit" value="Edit" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import axios from 'axios';

  // TODO: refactor to use apiProjects

  export default {
    name: 'CreateProject',
    data(){
      return{
        project: [],
        projectid: '',
        projectname: '',
        projectdesc:'',
        error: false,
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        const token = this.$store.getters.getCurrentUser.token;
        const that = this;

        that.projectid = that.$route.params.projectid;

        axios.get(this.$apiBaseUrl + '/api/projects/' + that.projectid, {
          headers: {
            'Authorization': 'Token ' + token
          }
        }).then(function (response) {
          that.project = response.data;
          that.projectname = response.data.name;
          that.projectdesc = response.data.description;
        }).catch(function (error) {
          that.error = 'there was a problem'
        });
      },
      editProject(){
        const that = this;
        const router = this.$router;
        const token = this.$store.getters.getCurrentUser.token;

        axios.put(this.$apiBaseUrl + '/api/projects/' + that.projectid + '/', {
            name: this.projectname,
            description: this.projectdesc
          },{
            headers: {
              'Authorization': 'Token ' + token
            }}
        )
          .then(function() {
            router.push('/project/' + that.projectid)
          })
          .catch(function(error) {
            that.error = true;
          });
      },
    }
  }
</script>
