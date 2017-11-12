import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/components/HomePage';
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
      path: '/charbonnet',
      name: 'Charbonnet',
      component: CharbonnetContributions,
    },
    {
      path: '/cantrell',
      name: 'Cantrell',
      component: CantrellContributions,
    },
  ],
});
