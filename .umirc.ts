import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    // 我的页面
    { path: '/my', component: '@/pages/my' },
    // 个人资料
    { path: '/person', component: '@/pages/my/person' },
    // 我的订单
    { path: '/order', component: '@/pages/my/order' },
    // 账单地址
    { path: '/address', component: '@/pages/my/address' },
  ],
  fastRefresh: {},
  proxy: {
    '/api': {
      target: 'http://110.42.190.78:8888',
      changeOrigin: true,
      // 'pathRewrite': { '^/api': '' },
    },
  },
});
