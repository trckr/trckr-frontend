<template>
  <div class="component component--taskPage">
    <div v-for="item in task">
      <h1>{{ item.name }}</h1>
      <p>{{ item.description }}</p>
    </div>
  </div>

</template>

<script>
  import axios from 'axios';

  export default {
    name: "TaskPage",
    data() {
      return {
        task:[],
        error: ''
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData(){
        const token = this.$store.getters.getCurrentUser.token;
        const that = this;

        that.projectid = that.$route.params.projectid;
        that.taskid = that.$route.params.taskid;

        axios.get(this.$apiBaseUrl + '/api/projects/' + that.projectid + '/tasks/' + that.taskid, {
          headers: {
            'Authorization': 'JWT ' + token
          }
        })
          .then(response => {
            that.task = response;
          })
          .catch(error => {
            that.error = error;
          });
      }
    }

  }
</script>
