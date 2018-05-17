<template>
  <div id="app">
    <header>
      <section>
        <div class="logo--wrapper">
          <img src="./assets/logo.png" alt="trckr" title="trckr" />
        </div>

        <navigation />
      </section>
    </header>

    <main>
      <section>
        <router-view />
      </section>
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
