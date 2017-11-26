<template>
  <div>
    <table class="table is-hoverable">
      <tbody>
      <tr>
      <td>Total Donation</td>
      <td>{{totalDonations}} ({{totalTransactions.toLocaleString()}})</td>
      </tr>
      <tr>
      <td>Average Donation</td>
      <td>{{average}}</td>
      </tr>
      <tr>
      <td>Largest Donation</td>
      <td>{{format(this.largestDonation[0])}} ({{this.largestDonation.length}})</td>
      </tr>
      <tr>
      <td>Most Donations in a Day</td>
      <td>{{format(mostRaisedDay)}} {{mostDonationDay}} ({{mostDonationDayCnt}})</td>
      </tr>
      <tr>
      <td>Most Raised in a Day</td>
      <td>{{format(mostDonationRaised)}} {{mostDonationRaisedDay}} ({{mostDonationRaisedDayCnt}})</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Vue from 'vue';
import Papa from 'papaparse';

export default {
  name: 'ContributionStats',
  props: ['file'],
  data() {
    return {
      title: 'New Orleans Political Contribution Stats',
      fileUrl: `${Vue.config.fileUrl}static/${this.file}`,
      median: 0,
      average: 0,
      mostDonations: {},
      largestDonation: [0],
      totalDonations: 0,
      totalTransactions: 0,
      mostRaisedDay: 0,
      mostDonationDay: '',
      mostDonationDayCnt: 0,
      mostDonationRaisedDay: 0,
      mostDonationRaisedDayCnt: 0,
      mostDonationRaised: 0,
      total: 0,
      data: [],
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
    dayOfMostDonations() {
      let highKey = 0;
      Object.keys(this.mostDonations).forEach((a, b) => {
        if (b === 0) {
          highKey = a;
        } else if (this.mostDonations[a].length > this.mostDonations[highKey].length) {
          highKey = a;
        }
      });
      this.mostDonationDay = highKey;
    },
    totalRaisedOnMostDonations() {
      let t = 0;
      this.mostDonations[this.mostDonationDay].forEach((x) => {
        t += Number(x[7].replace(/[^0-9]+/g, '')) / 100;
      });
      this.mostRaisedDay = t;
    },
    countDonationDays() {
      this.mostDonationDayCnt = this.mostDonations[this.mostDonationDay].length;
    },
    goodNum(num) {
      return Number(num[7].replace(/[^0-9]+/g, '')) / 100;
    },
    mostRaisedInDay() {
      let highKey = 0;
      let mr = 0;
      Object.keys(this.mostDonations).forEach((a, b) => {
        if (b === 0) {
          highKey = a;
          this.mostDonations[a].forEach((c) => {
            mr += this.goodNum(c);
            console.log('mr start');
            console.log(mr);
          });
        } else {
          let tmpMr = 0;
          this.mostDonations[a].forEach((c) => {
            tmpMr += this.goodNum(c);
            console.log('tmpmr');
            console.log(tmpMr);
          });
          if (tmpMr > mr) {
            highKey = a;
            mr = tmpMr;
          }
        }
      });
      console.log('finish');
      console.log(mr);
      console.log(highKey);
      this.mostDonationRaisedDay = highKey;
      this.mostDonationRaisedDayCnt = this.mostDonations[highKey].length;
      this.mostDonationRaised = mr;
    },
  },
  mounted() {
    Papa.parse(this.fileUrl, {
      download: true,
      complete: (results) => {
        this.data = results.data.splice(1);
        this.data.forEach((a, b) => {
          if (a.length > 2) {
            const amt = Number(a[7].replace(/[^0-9]+/g, '')) / 100;
            this.total += amt;
            this.totalTransactions = b + 1;
            this.average = this.format(this.total / this.totalTransactions);
            this.totalDonations = this.format(this.total);
            if (amt > this.largestDonation[0]) {
              this.largestDonation = [amt];
            } else if (amt === this.largestDonation[0]) {
              this.largestDonation.push(amt);
            }

            if (this.mostDonations[a[6]]) {
              this.mostDonations[a[6]].push(a);
            } else {
              this.mostDonations[a[6]] = [a];
            }
          }
        });
        this.dayOfMostDonations();
        this.totalRaisedOnMostDonations();
        this.countDonationDays();
        this.mostRaisedInDay();
      },
    });
  },
};
</script>

<style scoped>
.table {
  margin: 1.5rem auto;
}
</style>
