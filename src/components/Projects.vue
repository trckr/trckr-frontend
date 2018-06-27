<template>
  <div class="component component--projects">
    <article>
      <header>
        <h1>Projects</h1>
      </header>

      <section>
        <div v-if="error" class="message message--error">
          Something went wrong.
        </div>

        <div v-if="projects.length > 0">
          <div class="table-filter">
            <input type="text" v-model="search" placeholder="Filter projects" />
          </div>

          <div class="table-wrapper">
            <table id="table--project-task">
              <thead>
              <tr>
                <th>Project</th>
                <th>Description</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="project in filteredProjects">
                <td><router-link :to="{path: '/project/' + project.id}">{{ project.name }}</router-link></td>
                <td>{{ project.description }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="table-empty--message" v-if="projects.length === 0">
          <p>You don't have any projects yet.</p>
        </div>
      </section>

      <footer>
        <div class="main-actions">
          <router-link :to="{path: '/project/create'}" class="icon icon--add">Create project</router-link>
        </div>
      </footer>
    </article>
  </div>
</template>

<script>
  import { apiProjects } from '@/api/projects';

  export default {
    name: 'Projects',
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

        /**
         * this method will get all projects for the current user. the projects are iteratively added to a generated
         * table.
         */
        apiProjects.getAll(
          this.$apiBaseUrl,
          token,
          function(response) {
            that.projects = response.data;
          },
          function(error) {
            that.error = true;
          }
        )
      },
    },
    computed: {

      /**
       * this method allows to filter the projects and returns the projects that match the filter
       */
      filteredProjects: function() {
        return this.projects.filter((project) => {
          return project.name.toLowerCase().match(this.search.toLowerCase());
        });
      },
    },
  }
</script>
