<template>
  <div class="component component--dashboard">
    <article>
      <header>
        <h1>Dashboard</h1>
      </header>

      <section>
        <div v-if="error" class="message message--error">
          Something went wrong. {{ pong }}
        </div>
      </section>

      <section>
        <h2>This week's tracked time</h2>
        <tracked-time-chart/>
      </section>

      <section class="grid-two-columns">
          <div>
            <h2>My Tasks</h2>
            <task-list/>
          </div>
          
          <div>
            <h2>Tracked time per task</h2>
            <tracked-time-per-task-chart/>
          </div>
      </section>
    </article>
  </div>
</template>

<script>
  import axios from 'axios';
  import TrackedTimeChart from '@/components/TrackedTimeChart';
  import TrackedTimePerTaskChart from '@/components/TrackedTimePerTaskChart';
  import TaskList from '@/components/TaskList'

  export default {
    name: 'Dashboard',
    components: { TrackedTimeChart, TrackedTimePerTaskChart, TaskList },
    data: function() {
      return {
        pong: 'Waiting for server response',
        projects: [],
        search: '',
        error: false,
      };
    },
    created: function() {
      this.fetchData();
    },
    methods: {
      fetchData: function() {
        const token = this.$store.getters.getCurrentUser.token;
        const that = this;

        axios.get(this.$apiBaseUrl + '/api/ping/', {
          headers: {
            'Authorization': 'Token ' + token
          }
        }).then(function(response) {
          that.pong = response.data;
        }).catch(function(error) {
          that.pong = 'The ping request resulted in an error.'
        });
      },
    },
  }
</script>
