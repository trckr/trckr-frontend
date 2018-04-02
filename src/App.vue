<template>
  <div id="app">
    <header>
      <navigation />
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import Navigation from '@/components/navigation';

export default {
  name: 'trckr',
  components: {
    Navigation,
  }
}
</script>

<style lang="scss">
@import 'sass/style.scss';

* {
  box-sizing: border-box;
  font-size: 100%;
  margin: 0;
  padding: 0;
}

#app {
  color: $color-main;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 100%;
  font-weight: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  > header {
    background-color: $color-header;
  }

  > main {
    display: flex;
    justify-content: center;
    padding-top: 1rem;
  }

  > header > .component,
  > main > .component,
  > footer > .component {
    margin: 0 auto;
    max-width: $component-max-width;
  }
}
</style>
