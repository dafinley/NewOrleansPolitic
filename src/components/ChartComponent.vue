<template>
  <div ref='chart' class='chart'>
  <div>
    <div>Amount Raised: <span>${{amount.toLocaleString()}}</span></div>
    <div>Total Transaction: <span>{{transactions.toLocaleString()}}</span></div>
    <router-link to="/" class="button">Home</router-link> 
  </div> 
  <svg ref='svg' width='100%' height='400'></svg>  
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'Chart',
  props: {
    fileUrl: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      msg: 'New Orleans Political Data',
      amount: 0,
      transactions: 0,
    };
  },
  mounted() {
    const svg = d3.select('svg');
    const margin = { top: 20, right: 0, bottom: 30, left: 60 };
    const width = +this.$refs.chart.clientWidth - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;
    const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

    const parseTime = d3.timeParse('%m/%d/%Y');

    const x = d3.scaleTime()
        .rangeRound([0, width]);

    const y = d3.scaleLinear()
        .rangeRound([height, 0]);

    const area = d3.area()
        .x(d => x(d.date))
        .y1(d => y(d.amount));

    d3.csv(this.fileUrl, (d) => {
      const dd = d;
      dd.date = parseTime(d.Date);
      this.transactions += 1;
      this.amount += Number(d.Amount.replace(/[^0-9]+/g, '')) / 100;
      dd.amount = +this.amount;
      return dd;
    }, (error, data) => {
      if (error) throw error;

      x.domain(d3.extent(data, d => d.date));
      y.domain([0, d3.max(data, d => d.amount)]);
      area.y0(y(0));

      g.append('path')
          .datum(data)
          .attr('fill', 'steelblue')
          .attr('d', area);

      g.append('g')
          .attr('transform', `translate(0,${height})`)
          .call(d3.axisBottom(x));

      g.append('g')
          .call(d3.axisLeft(y))
        .append('text')
          .attr('fill', '#000')
          .attr('transform', 'rotate(-90)')
          .attr('y', 6)
          .attr('dy', '0.71em')
          .attr('text-anchor', 'end')
          .text('Amount ($)');
    });
  },
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.chart {
  width: 80%;
  margin: 0 auto;
}
</style>
