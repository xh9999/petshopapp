import { defineConfig } from 'umi';
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        { path: '/', component: '@/pages/index' },
        { path: '/user', component: '@/pages/user/index' },
        // { path: '/shopcar', component: '@/pages/shopcar/index' },
        { path: '/shopping', component: '@/pages/shopping/shopping.tsx' },
        { path: '/login', component: '@/pages/Login/index' },
        { path: '/register', component: '@/pages/register/index' },
        { path: '/goodsorder', component: '@/pages/goodsOrder/index' },
        { path: '/cart', component: '@/pages/cart/index' },
        { path: '/order', component: '@/pages/order/index' },
        { path: '/myOrder', component: '@/pages/myOrder/index' },
      ],
    },
  ],
  fastRefresh: {},
  dva: {
    immer: true,
    hmr: false,
  },
  proxy: {
    '/api': {
      target: 'http://110.42.190.78:8888',
      changeOrigin: true,
    },
  },
  antd: {},
});
