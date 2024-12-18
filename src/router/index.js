import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PopularHexView from '../views/PopularHexView.vue';
import ColorMixerView from '../views/ColorMixerView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/mixer',
    name: 'mixer',
    component: ColorMixerView,
  },
  {
    path: '/popular',
    name: 'popular',
    component: PopularHexView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});
  
export default router;