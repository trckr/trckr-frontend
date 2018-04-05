<template>
  <div class="component component--projectPage">
    <div v-for="item in project">
      <h1>{{ item.name }}</h1>
      <p>{{ item.description }}</p>
    </div>
    <h2>Tasks</h2>

  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "Project",
    data(){
      return {
        project: [],
        // these can currently not be used, TODO: figure out why
        projectname: '',
        projectid: 0,
        description: '',
        modifiedDate: '',
        createdDate: '',
        error: '',
      }
    },
    created: function() {
      this.fetchData();
    },
    methods: {
      fetchData(){

        const token = this.$store.getters.getCurrentUser.token;
        const that = this;

        that.projectid = that.$route.params.id;

        axios.get(this.$apiBaseUrl + '/api/projects/' + that.projectid, {
          headers: {
            'Authorization': 'JWT ' + token
          }
        })
          .then(response => {
            that.project = response;
            that.projectname = response.name;
            that.description = response.description;
            that.modifiedDate = response.modifiedDate;
            that.createdDate = response.createdDate;
          })
          .catch(error => {
            that.error = error;
          });
      }
    }
  }

</script>
