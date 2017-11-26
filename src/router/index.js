import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/components/HomePage';
import Stats from '@/components/Stats';
import CharbonnetContributions from '@/components/CharbonnetContributions';
import CantrellContributions from '@/components/CantrellContributions';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
    },
    {
      path: '/charbonnet/',
      name: 'Charbonnet',
      component: CharbonnetContributions,
      children: [
        {
          path: 'stats',
          name: 'CharbonnetStats',
          component: Stats,
          props: {
            file: 'charbonnet-contributions.json',
          },
        },
      ],
    },
    {
      path: '/cantrell/',
      name: 'Cantrell',
      component: CantrellContributions,
      children: [
        {
          path: 'stats',
          name: 'CantrellStats',
          component: Stats,
          props: {
            file: 'cantrell-contributions.json',
          },
        },
      ],
    },
  ],
});
