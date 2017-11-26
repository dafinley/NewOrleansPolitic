<template>
  <div ref='chart' class='chart'>
  <div class='toolTip'></div>
  <div>
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
  methods: {
    format(n) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
      }).format(n);
    },
  },
  mounted() {
    const svg = d3.select('svg');
    const margin = { top: 20, right: 0, bottom: 30, left: 60 };
    const width = +this.$refs.chart.clientWidth - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;
    const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

    const tooltip = d3.select('.toolTip');

    const parseTime = d3.timeParse('%m/%d/%Y');

    const formatTime = d3.timeFormat('%b %d, %Y');

    const x = d3.scaleTime()
        .rangeRound([0, width]);

    const y = d3.scaleLinear()
        .rangeRound([height, 0]);

    const area = d3.area()
        .x(d => x(d.date))
        .y1(d => y(d.amount));

    const line = d3.line()
        .x(d => x(d.date))
        .y(d => y(d.amount));

    d3.csv(this.fileUrl, (d) => {
      const dd = d;
      dd.date = parseTime(d.Date);
      this.transactions += 1;
      this.amount += Number(d.Amount.replace(/[^0-9]+/g, '')) / 100;
      dd.amount = +this.amount;
      return dd;
    }, (error, data) => {
      if (error) throw error;

      data.sort((a, b) => a.date - b.date);

      const xDomain = x.domain(d3.extent(data, d => d.date));
      const yDomain = y.domain([0, d3.max(data, d => d.amount)]);
      area.y0(y(0));

      g.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke-width', 2)
        .attr('stroke', 'steelblue')
        .attr('d', line);

      g.append('path')
          .datum(data)
          .attr('fill', 'steelblue')
          .attr('d', area);

      g.append('g')
          .attr('transform', `translate(0,${height})`)
          .call(d3.axisBottom(x))
          .on('mouseleave', () => {
            tooltip.style('display', 'none');
          });

      g.append('g')
          .call(d3.axisLeft(y))
        .append('text')
          .attr('fill', '#000')
          .attr('transform', 'rotate(-90)')
          .attr('y', 6)
          .attr('dy', '0.71em')
          .attr('text-anchor', 'end')
          .text('Amount ($)')
          .on('mouseleave', () => {
            tooltip.style('display', 'none');
          });

      g.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => x(d.date))
        .attr('cy', d => y(d.amount))
        .attr('r', 2)
        .attr('fill', 'white')
        .attr('stroke', 'lightgrey')
        .attr('stroke-width', 2);

      const focus = g.append('g').style('display', 'none');

      focus.append('line')
        .attr('id', 'focusLineX')
        .attr('class', 'focusLine');

      focus.append('line')
        .attr('id', 'focusLineY')
        .attr('class', 'focusLine');

      focus.append('circle')
        .attr('id', 'focusCircle')
        .attr('r', 3)
        .attr('class', 'circle focusCircle');

      const bisectDate = d3.bisector(d => d.date).left;

      g.append('rect')
      .attr('class', 'overlay')
      .attr('width', width)
      .attr('height', height)
      .on('mouseover', () => focus.style('display', null))
      .on('mouseout', () => focus.style('display', 'none'))
      .on('mousemove', (a, b, c) => {
        const mouse = d3.mouse(c[0]);
        const mouseDate = x.invert(mouse[0]);
        const i = bisectDate(data, mouseDate);
        const d0 = data[i - 1];
        const d1 = data[i];

        const d = d1 && mouseDate - d0[0] > d1[0] - mouseDate ? d1 : d0;

        const xx = x(d.date);
        const yy = y(d.amount);

        focus.select('#focusCircle')
          .attr('cx', xx)
          .attr('cy', yy);

        focus.select('#focusLineX')
          .attr('x1', xx)
          .attr('y1', y(yDomain(0)))
          .attr('x2', xx)
          .attr('y2', y(yDomain(1)));

        focus.select('#focusLineY')
          .attr('x1', x(xDomain(0)))
          .attr('y1', yy)
          .attr('x2', x(xDomain(1)))
          .attr('y2', yy);

        const amt = this.format(d.amount);
        tooltip
          .style('left', `${d3.event.pageX - 50}px`)
          .style('top', `${d3.event.pageY - 100}px`)
          .style('display', 'inline-block')
          .html(`${formatTime(d.date)}</br>${amt}`);
      });
    });
  },
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style>
.chart {
  width: 80%;
  margin: 0 auto;
}

.toolTip {
  position: absolute;
  display: none;
  min-width: 80px;
  height: auto;
  background: none repeat scroll 0 0 #ffffff;
  border: 1px solid #6F257F;
  padding: 14px;
  text-align: center;
}

.overlay {
  fill: none;
  stroke: none;
  pointer-events: all;
}

.focusline {
  fill: none;
  stroke: steelblue;
  stroke-width: 0.5px;
}

.focusCircle {
  fill: red;
}
</style>
