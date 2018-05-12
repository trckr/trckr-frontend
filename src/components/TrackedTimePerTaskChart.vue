<template>
  <div class="component component--tracked-time-per-taks-chart">
    <doughnut-chart :chartData="chartData"/>
  </div>
</template>

<script>
  import palette from 'google-palette';
  import DoughnutChart from '@/components/DoughnutChart';
  import { apiTimeEntries } from '@/api/time-entries';

  export default {
    name: 'TrackedTimeChart',
    components: { DoughnutChart },
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

      getRandomColors: function(numberOfColors) {
      
      }
    },
    computed: {
      chartData: function() {
        const that = this;
        var trackedTimePerTask = {};

        this.timeEntries.forEach(function(element) {
          var label = element.task;

          if (trackedTimePerTask.hasOwnProperty(label)) {
            trackedTimePerTask[label] += parseFloat(element.timeSpent);
          } else {
            trackedTimePerTask[label] = parseFloat(element.timeSpent);
          }         
        });

        return {
          labels: Object.keys(trackedTimePerTask),
          datasets: [{ 
            data: Object.values(trackedTimePerTask),
            backgroundColor: palette('cb-Spectral', this.timeEntries.length).map(function(e) { 
              return '#' + e;
            }),
          }]
        }
      }
    }
  }
</script>
