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

    <footer>
      <section>
        <p>© 2018 by trckr. Hackable on <a href="https://github.com/trckr/trckr-frontend" target="_blank">github.com/trckr/trckr-frontend</a>.</p>
      </section>
    </footer>
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
