<template>
  <div class="component component--time-entries">
    <div v-if="error" class="message message--error">
      Something went wrong.
    </div>

    <article>
      <header>
        <h1>Time Entries</h1>

        <div class="main-actions">
          <router-link :to="{path: '/time-entry/create'}">New Time entry</router-link>
        </div>
      </header>

      <section class="content">
        <table id="time-entries" v-if="timeEntries.length > 0">
          <thead>
          <tr>
            <th>Description</th>
            <th>Time</th>
            <!-- <th>Actions</th> -->
          </tr>
          </thead>
          <tbody>
          <tr v-for="timeEntry in timeEntries">
            <td>{{ timeEntry.description }}</td>
            <td>{{ timeEntry.timeSpent }}</td>
            <!-- <td><router-link :to="{path: '/time-entry/' + timeEntry.id + '/edit'}">Edit</router-link></td> -->
          </tr>
          </tbody>
        </table>

        <div class="table-empty--message" v-if="timeEntries.length === 0">
          <p>You don't have any time entries yet.</p>
        </div>
      </section>
    </article>
  </div>
</template>

<script>
  import { apiTimeEntries } from '@/api/time-entries';

  export default {
    name: 'TimeEntries',
    data: function() {
      return {
        timeEntries: [],
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

        apiTimeEntries.getAll(
          this.$apiBaseUrl,
          token,
          function(response) {
            // Clean up numbers.
            for (var i = 0; i < response.data.length; i++) {
              response.data[i].timeSpent = parseFloat(response.data[i].timeSpent).toFixed(2);
            }

            that.timeEntries = response.data;
          },
          function(error) {
            that.error = true;
          }
        )
      },
    },
  }
</script>
