<template>
  <div class="component component--tracked-time-chart">
    <bar-chart :chartData="chartData" />
  </div>
</template>

<script>
  import moment from 'moment';
  import BarChart from '@/components/BarChart';
  import { apiTimeEntries } from '@/api/time-entries';

  export default {
    name: 'TrackedTimeChart',
    components: { BarChart },
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
            for (let i = 0; i < response.data.length; i++) {
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
    computed: {
      chartData: function() {
        const that = this;
        let trackedTimePerDay = new Array(7).fill(0);
        let currentDate = new moment();
        let startOfWeek = currentDate.startOf('isoWeek').unix();
        let endOfWeek = currentDate.endOf('isoWeek').unix();

        this.timeEntries.forEach(function(element) {
          let elementDate = moment(element.startTime);
          let elementTimestamp = elementDate.unix();
          if (elementTimestamp >= startOfWeek && elementTimestamp <= endOfWeek) {
            // Subtract one since the numeric value isoWeekday of monday is 1.
            let index = elementDate.isoWeekday() - 1;
            trackedTimePerDay[index] += parseFloat(element.timeSpent);
          }
        });

        return {
          labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          datasets: [{
            label: 'Tracked time in hours',
            backgroundColor: '#f87979',
            data: trackedTimePerDay
          }],
        };
      },
    },
  }
</script>
