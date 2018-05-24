<template>
  <div class="component component--dashboard">
    <article>
      <header>
        <h1>Dashboard</h1>
      </header>

      <section>
        <h2>This week's tracked time</h2>
        <tracked-time-chart />
      </section>

      <section>
        <div class="grid">
          <div class="col col-6-12">
            <task-list />
          </div>

          <div class="col col-6-12">
            <tracked-time-per-task-chart />
          </div>
        </div>
      </section>
    </article>
  </div>
</template>

<script>
  import TrackedTimeChart from '@/components/TrackedTimeChart';
  import TrackedTimePerTaskChart from '@/components/TrackedTimePerTaskChart';
  import TaskList from '@/components/TaskList'

  export default {
    name: 'Dashboard',
    // the components are the charts that are included on the dashboard.
    components: { TrackedTimeChart, TrackedTimePerTaskChart, TaskList },
    data: function() {
      return {
        error: false,
      };
    },
  }
</script>
