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
        { path: '/shopcar', component: '@/pages/shopcar/index' },
        { path: '/orderdetail', component: '@/pages/orderDetail/index' },
        { path: '/goodsdetail', component: '@/pages/GoodsDetail/index' },
        { path: '/login', component: '@/pages/Login/index' },
        { path: '/register', component: '@/pages/register/index' },
        { path: '/goodsorder', component: '@/pages/goodsOrder/index' },
        { path: '/cart', component: '@/pages/cart/index' },
        { path: '/order', component: '@/pages/order/index' },
      ],
    },
  ],
  fastRefresh: {},
  proxy: {
    '/api': {
      target: 'http://110.42.190.78:8888',
      changeOrigin: true,
    },
  },
  antd: {},
});
