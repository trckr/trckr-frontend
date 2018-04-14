<template>
  <div class="component component--SearchList">
    <h1>Projects</h1>
    <p>Welcome to your Projects!</p>
   </div>
    <div id="demo">
    <form id="search">
      Search <input name="query" v-model="query">
    </form>
    <table>
      <thead>
      <tr>
        <th nowrap>id</th>
        <th nowrap>ProjectName</th>
        <th nowrap>description</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in tableFilter">
        <td >{{item.id}}</td>
        <td >{{item.ProjectName}}</td>
        <td >{{item.description}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<style>
table {
border-collapse: collapse;
}

table, th, td {
border: 1px solid black;
cursor:default;
user-select: none;
}

th.active {
background-color: #888888;
}

td {
padding: 10px 20px;
text-align: center;
}

#search {
padding-bottom: 20px;
}

th.active .arrow {
opacity: 1;
}
.arrow {
display: inline-block;
vertical-align: middle;
margin-left: 5px;
font-size: 10px;
color: #ccc;
}
.arrow:after {
font-family: FontAwesome;
content: "\f0dc";
}
.active .arrow.asc:after {
font-family: FontAwesome;
content: "\f0de";
color: #1bc98e;
}
.active .arrow.dsc:after {
font-family: FontAwesome;
content: "\f0dd";
color: #1bc98e;
}
</style>
<script>
var vm = new Vue({
  el: '#demo',
  data: {
  projects: [
    { id: '1', ProjectName: 'Project 1', description:'description1'},
    { id: '2', ProjectName: 'Project 2', description:'description2'},
    { id: '3', ProjectName: 'Project 3', description:'description3'},
    { id: '4', ProjectName: 'Project 4', description:'description4'}
    ],
    query: '',
  },
  computed: {
    tableFilter: function () {
    return this.findBy(this.projects, this.query, 'ProjectName')
  }
  },
  methods: {
    findBy: function (list, value, column) {
    return list.filter(function (item) {
    return item[column].includes(value)
  })
  }
  }
})
</script>
