<template>
  <h1 id="title"> {{ $route.params.id }} </h1>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "Project",
    data(){
      return {
        projectname: '',
        projectid: 0,
        description: '',
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

        that.projectname = that.$route.params.id;
        console.log(that.projectname);

        axios.get('https://trckr-api.trvlr.ch/api/project/' + that.projectid, {
          headers: {
            'Authorization': 'JWT ' + token
          }
        })
          .then(response => {
            console.log(response.data)
        })
          .catch(error => {
            that.error = error;
          });
      }
    }
  }

</script>
