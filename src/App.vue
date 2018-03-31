<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'trckr'
}
</script>

<style>
* {
  box-sizing: border-box;
  font-size: 100%;
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 100%;
  font-weight: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
