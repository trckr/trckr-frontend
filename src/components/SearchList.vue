  <template>
    <div class="component component--SearchList"></div>
    <div id="show-projects">
      <h1>All Projects</h1>
       <p>Welcome to your Projects!</p>
        <input type="text" v-model="search" placeholder="search in a list"/>
        <div v-for="project in filteredProjects">
        </div>
      </div>
  </template>

<script>
  export default{
    data(){
      return{
        projects:[],
        search: ''
      }
  },
  methods:{

  },
  created(){
    /*this.$http.get('https://jsonplaceholder.typicode.com/posts').them(function(data)){
      this.projects = data.body.slice(0,10)});*/
  },
  computed:{
    filteredProjects: function(){
      return this.projects.filter((project) => {
          return project.name.match(this.search)
       });
    }
  }
  }
  </script>
