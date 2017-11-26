<template>
  <div>
    <h1>{{ title }}</h1>
    <router-link to="/cantrell" class="button is-info">Cantrell Contributions</router-link> 
    <router-link to="/charbonnet" class="button is-info">Charbonnet Contributions</router-link>   
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      title: 'New Orleans Political Contributions',
    };
  },
};
</script>
