<template>
  <div class="component component--edit-project">
    <article>
      <header>
        <div class="back--wrapper">
          <router-link :to="{path: '/project/' + projectId}" class="icon icon--back">Back to project</router-link>
        </div>
        <h1>Edit Project</h1>
      </header>

      <section>
        <div v-if="error" class="message message--error">
          Something went wrong.
        </div>

        <form @submit.prevent="editProject">
          <div class="form-item">
            <label for="name">Project Name</label>
            <input v-model="name" id="name" type="text" required="required" />
          </div>
          <div class="form-item">
            <label for="description">Project Description</label>
            <textarea v-model="description" id="description"></textarea>
          </div>
          <div class="form-actions">
            <div class="form-action">
              <input type="submit" value="Edit" class="icon icon--edit" />
            </div>
          </div>
        </form>
      </section>
    </article>
  </div>
</template>

<script>
  import { apiProjects } from '@/api/projects';

  export default {
    name: 'CreateProject',
    data: function(){
      return{
        project: [],
        projectId: '',
        name: '',
        description:'',
        error: false,
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      /**
       * fetchdata() is required to load the currently existing data into the form
       */
      fetchData() {
        const token = this.$store.getters.getCurrentUser.token;
        const that = this;

        that.projectId = that.$route.params.projectId;

        apiProjects.getSingle(
          this.$apiBaseUrl,
          token,
          this.projectId,
          function(response) {
            that.project = response;
            // will load the current name into the name textfield
            that.name = response.data.name;
            // will load the current description to the description textfield
            that.description = response.data.description;
          },
          function(error) {
            that.error = true;
          }
        );
      },
      editProject() {
        const that = this;
        const router = this.$router;
        const token = this.$store.getters.getCurrentUser.token;

        apiProjects.put(
          this.$apiBaseUrl,
          token,
          this.projectId,
          this.name,
          this.description,
          function() {
            router.push('/project/' + that.projectId)
          },
          function(error) {
            that.error = true;
          }
        );
      },
    },
  }
</script>
