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

        that.taskid = that.$route.params.taskid;

        axios.get(this.$apiBaseUrl + '/api/tasks/' + that.taskid, {
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
