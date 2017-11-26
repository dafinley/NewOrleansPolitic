<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <router-view/>   
    <ChartComponent :fileUrl='fileUrl'  />    
  </div>
</template>

<script>
// import Papa from 'papaparse';
import Vue from 'vue';
import ChartComponent from './ChartComponent';

export default {
  name: 'CantrellContributions',
  components: {
    ChartComponent,
  },
  data() {
    return {
      msg: 'Cantrell Contriubtions',
      chartData: [],
      fileUrl: `${Vue.config.fileUrl}static/cantrell-contributions.json`,
    };
  },
  mounted() {
    /*
    Papa.parse(this.fileUrl, {
      download: true,
      complete: (results) => {
        this.chartData = results.data;
      },
    });
    */
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
