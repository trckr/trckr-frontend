<template>
  <div class="component component--projects">
    <article>
      <header>
        <h1>Projects</h1>

        <div class="main-actions">
          <router-link :to="{path: '/project/create'}">Create project</router-link>
        </div>
      </header>

      <section>
        <div v-if="error" class="message message--error">
          Something went wrong.
        </div>

        <div class="table-filter">
          <input type="text" v-model="search" placeholder="Filter projects" />
        </div>

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
      </section>
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
    computed:{
      filteredProjects: function(){
        return this.projects.filter((project) => {
          return project.name.toLowerCase().match(this.search.toLowerCase());
        });
      }
    }
  }
</script>
