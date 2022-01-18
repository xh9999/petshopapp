import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/cart', component: '@/pages/cart/index' },
    { path: '/order', component: '@/pages/order/index' },
  ],
  fastRefresh: {},
  proxy: {
    '/api': {
      target: 'http://110.42.190.78:8888/',
      changeOrigin: true,
    },
  },
});
