<template>
  <div id="app">
    <MainNavbar />
    <router-view/>
  </div>
</template>

<script>
import MainNavbar from './components/MainNavbar';

export default {
  name: 'RootApp',
  components: {
    MainNavbar,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 15px;
}
</style>
