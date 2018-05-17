<template>
  <div class="component component--navigation">
    <span id="responsive-menu-trigger" v-on:click="toggleResponsiveMenu">
      <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <g>
          <path fill="none" stroke="#fff" stroke-width="5" stroke-linejoin="bevel" d="m 5.0916789,20.818994 53.8166421,0" />
          <path fill="none" stroke="#fff" stroke-width="5" stroke-linejoin="bevel" d="m 5.1969746,31.909063 53.8166424,0" />
          <path fill="none" stroke="#fff" stroke-width="5" stroke-linejoin="bevel" d="m 5.0916788,42.95698 53.8166422,0" />
        </g>
      </svg>
    </span>

    <nav id="main-navigation" v-bind:class="{ 'is-logged-in': this.$store.getters.isLoggedIn }">
      <ul>
        <li v-if="!this.$store.getters.isLoggedIn"><router-link to="/login" v-on:click.native="closeNavigation">Login</router-link></li>
        <li v-if="!this.$store.getters.isLoggedIn"><router-link to="/register" v-on:click.native="closeNavigation">Register</router-link></li>
        <li v-if="this.$store.getters.isLoggedIn"><router-link to="/dashboard" v-on:click.native="closeNavigation">Dashboard</router-link></li>
        <li v-if="this.$store.getters.isLoggedIn"><router-link to="/projects" v-on:click.native="closeNavigation">Projects</router-link></li>
        <li v-if="this.$store.getters.isLoggedIn"><router-link to="/time-entries" v-on:click.native="closeNavigation">Time Entries</router-link></li>
        <li v-if="this.$store.getters.isLoggedIn"><router-link to="/logout" v-on:click.native="closeNavigation">Logout</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>
  import Snap from 'snapsvg';

  export default {
    name: 'Navigation',
    methods: {
      toggleResponsiveMenu() {
        let nav = document.getElementById('main-navigation');

        if (nav.classList.contains('is-active')) {
          this.closeNavigation();
        } else {
          this.openNavigation();
        }
      },
      openNavigation() {
        let nav = document.getElementById('main-navigation');
        let menuTrigger = Snap('#responsive-menu-trigger svg');

        menuTrigger.select('path:nth-child(1)').animate({path: 'M 12.972944,50.936147 51.027056,12.882035'}, 250);
        menuTrigger.select('path:nth-child(2)').animate({opacity: 0}, 250);
        menuTrigger.select('path:nth-child(3)').animate({path: 'M 12.972944,12.882035 51.027056,50.936147'}, 250);
        nav.classList.add('is-active');
      },
      closeNavigation() {
        let nav = document.getElementById('main-navigation');
        let menuTrigger = Snap('#responsive-menu-trigger svg');

        if (nav.classList.contains('is-active')) {
          menuTrigger.select('path:nth-child(1)').animate({path: 'm 5.0916789,20.818994 53.8166421,0'}, 250);
          menuTrigger.select('path:nth-child(2)').animate({opacity: 1}, 250);
          menuTrigger.select('path:nth-child(3)').animate({path: 'm 5.0916788,42.95698 53.8166422,0'}, 250);
          nav.classList.remove('is-active');
        }
      },
    },
  }
</script>
