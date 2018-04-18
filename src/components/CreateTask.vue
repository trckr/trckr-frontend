<template>
  <div class="component component--task-creation">
    <div v-if="error" class="message message--error">
      Something went wrong.
    </div>

    <h1>Create a task</h1>
    <form @submit.prevent="createTask">
      <div class="form-item">
        <label for="taskname">Task Name</label>
        <input v-model="taskname" id="taskname" type="text" required="required" />
      </div>

      <div class="form-item">
        <label for="taskdesc">Task Description</label>
        <textarea v-model="taskdesc" id="taskdesc"></textarea>
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
  import axios from 'axios';

  export default {
    name: 'CreateTask',
    data(){
      return{
        taskname: '',
        taskdesc: '',
        projectid: '',
        error: false,
      }
    },
    methods: {
      createTask(){
        const that = this;
        const router = this.$router;
        const token = this.$store.getters.getCurrentUser.token;

        that.projectid = that.$route.params.projectid;

        axios.post(this.$apiBaseUrl + '/api/tasks/', {
            name: that.taskname,
            description: that.taskdesc,
            project: that.projectid
          },{
            headers: {
              'Authorization': 'Token ' + token
            }}
        )
          .then(function() {
            router.push('/project/'+ that.projectid)
          })
          .catch(function(error) {
            that.error = true;
          });
      },
    }
  }
</script>
