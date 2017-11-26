<template>
<nav class="navbar is-fixed-top is-transparent" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
      <router-link to="/" class="navbar-item">
        <img src="../assets/flag-of-nola.png" alt="New Orleans Mayoral Contributions"/>&nbsp;New Orleans
      </router-link>
      <button class=" button navbar-burger" v-on:click.stop="toggleNav">
        <span></span>
        <span></span>
        <span></span>
      </button>
  </div>
  <div class="navbar-menu" v-bind:class='menu'>
    <div class="navbar-end">
      <div class="navbar-item has-dropdown is-hoverable">
        <router-link to="/cantrell" class="navbar-link">Cantrell</router-link>
        <div class="navbar-dropdown">
        <router-link to="/cantrell" class="navbar-item">Main</router-link>
        <hr class="navbar-divider" />
        <router-link to="/cantrell/stats" class="navbar-item">Stats</router-link>
        <hr class="navbar-divider" />
        <router-link to="/cantrell/map" class="navbar-item">Map</router-link>
        </div>
      </div>
      <div class="navbar-item has-dropdown is-hoverable">
        <router-link to="/charbonnet" class="navbar-link">Charbonnet</router-link>
        <div class="navbar-dropdown">
        <router-link to="/charbonnet" class="navbar-item">Main</router-link>
        <hr class="navbar-divider" />
        <router-link to="/charbonnet/stats" class="navbar-item">Stats</router-link>
        <hr class="navbar-divider" />
        <router-link to="/charbonnet/map" class="navbar-item">Map</router-link>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  name: 'MainNavbar',
  data() {
    return {
      menu: {
        'is-active': false,
      },
    };
  },
  methods: {
    toggleNav() {
      this.menu['is-active'] = !this.menu['is-active'];
    },
  },
};
</script>
