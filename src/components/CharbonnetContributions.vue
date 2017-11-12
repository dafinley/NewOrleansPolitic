<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ChartComponent :fileUrl='fileUrl'  />    
  </div>
</template>

<script>
// import Papa from 'papaparse';
import ChartComponent from './ChartComponent';

export default {
  name: 'CharbonnetContributions',
  components: {
    ChartComponent,
  },
  data() {
    return {
      msg: 'Charbonnet Contributions',
      chartData: [],
      fileUrl: 'http://nopolitico.starlineventures.com/static/charbonnet-contributions.json',
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
h1 {
  font-weight: normal;
}
</style>
