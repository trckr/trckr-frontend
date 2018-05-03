<template>
  <div id="app">
    <header>
      <div class="logo">
        <img src="./assets/logo.png" alt="trckr" title="trckr" />
      </div>

      <navigation />
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
  import Navigation from '@/components/Navigation';

  export default {
    name: 'trckr',
    components: {
      Navigation,
    },
  }
</script>

<style lang="scss">
  @import 'sass/style.scss';
</style>
