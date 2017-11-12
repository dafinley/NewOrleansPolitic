<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <router-link to="/charbonnet" class="button is-info">Charbonnet Contributions</router-link>
    <router-link to="/cantrell" class="button is-info">Cantrell Contributions</router-link>    
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      msg: 'New Orleans Political Data',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

.button {
  margin: 10px;
}
</style>
